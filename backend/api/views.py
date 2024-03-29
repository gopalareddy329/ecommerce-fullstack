# myapp/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User 
from django.views.decorators.csrf import csrf_exempt
from .serializer import UserSerializer,ProductSerializer
from .token import MyTokenObtainPairSerializer
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from .models import Product,UserInfo
from django.db.models import Count,F,Sum
import random
from sklearn.preprocessing import LabelEncoder


# Replace "kmeans_Customer_Analysis.pkl" with your actual filename
model = joblib.load("ml_models/new_kmeans_model.pkl")
scaler = joblib.load("ml_models/scaler.pkl")
pca = joblib.load("ml_models/pca.pkl")
clusters=pd.read_csv("ml_models/clusters.csv")
label_encoder = LabelEncoder()

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    username = request.data.get('username_or_email')
    password = request.data.get('password')
    dob=request.data.get("dob") 
    if not username or not password or not dob:
        return Response({'error': 'Username and password and dob are required'}, status=status.HTTP_400_BAD_REQUEST)
    name=request.data.get("name") if request.data.get("name") !=None else  username.split("@")[0] if '@' in username else username
    email=request.data.get("email") if request.data.get("email") !=None else  username if '@' in username else '' 
    
    
    

    try:
        user, created = User.objects.get_or_create(username=username,email=email,name=name)
        print(username,name)
        if created:
                user_info=UserInfo.objects.create(Year_Birth=dob)
                user_info.save()
                user.info = user_info
                user.set_password(password)
                user.save()
                serializer=MyTokenObtainPairSerializer(data={"username":username,"email":email,"name":name,"password":password})
                serializer.is_valid(raise_exception=True)
            

                return Response({'refresh': str(serializer.validated_data["refresh"]),'access':serializer.validated_data['access']}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def get_personal_info(request):
    user = User.objects.get(id=request.user.id)
    Marital_Status=request.data.get("maritalstatus")
    Education=request.data.get("education")
    Income=request.data.get("income")
    try:
        
        if user:
            user.info.Marital_Status=Marital_Status
            user.info.Education=Education
            user.info.Income=Income
            user.info.save()
            user.save()
            return Response({"result":"Got the info"})
        else:
            return Response({'error': 'Log the user'}, status=status.HTTP_400_BAD_REQUEST) 
    except Exception as e:
        print(e)
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    print(user.username)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def predict_user_cluster(request):
    user=User.objects.get(username="pmallireddy329@gmail.com")
    category_counts = Product.objects.filter(purchases__user__id=user.id).annotate(category_name=F('category'),total_spent=Sum(F('purchases__quantity')*random.randint(190,250) )).values('category_name', 'total_spent')
    total_spent_sum = sum(category['total_spent'] for category in category_counts)
    User_input = pd.DataFrame([[0, 'Basic', 'Single', 245600,total_spent_sum]], columns=['year_birth', 'education', 'marital_status', 'income','expenses'])
    User_input['education'] = label_encoder.fit_transform(User_input['education'])
    User_input['marital_status'] = label_encoder.fit_transform(User_input['marital_status'])
    scaled_data = scaler.transform(User_input)
    data=pca.transform(scaled_data)
    pred_cluster=model.predict(data)[0]
    pred_cl_details = clusters[clusters['Cluster'] == pred_cluster]
    products_col =["wines","fruits","meat","fish","sweet","gold"]
    products_bought = pred_cl_details[products_col].sum()
    total_amt = products_bought.sum()
    percent_products_bought = ((products_bought / total_amt) * 100).sort_values(ascending=False)
    products=get_products_with_percentage(percent_products_bought)
    random.shuffle(products)
    serial=ProductSerializer(products,many=True)
    return Response({"result":serial.data})



def predict_test():
    products=Product.objects.all()
    category_mapping={'MntWines':'wines','MntFruits':'fruits','MntMeatProducts':'meat','MntFishProducts':'fish','MntSweetProducts':'sweet','MntGoldProds':'gold'}
    for product in Product.objects.all():
        old_category_name = product.category
        new_category_name = category_mapping.get(old_category_name, old_category_name)
        product.category = new_category_name
        product.save()






def get_products_with_percentage(percentage_per_category):
    products_by_category = Product.objects.values('category').annotate(
        total_products=Count('id'),
    )

    total_products = min(30, Product.objects.count()) 
    
    filtered_products = []
    for category_data in products_by_category:
        category = category_data['category']
        if category in percentage_per_category.index:
            target_percentage = percentage_per_category.loc[category]
            target_products = total_products * target_percentage * 0.01
            if not pd.isna(target_products) and target_products >= 0:
                products = Product.objects.filter(category=category)[:int(target_products)]
                filtered_products.extend(list(products))

    
    return filtered_products
