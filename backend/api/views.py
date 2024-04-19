# myapp/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User 
from django.views.decorators.csrf import csrf_exempt
from .serializer import UserSerializer,ProductSerializer,HeaderSerializer
from .token import MyTokenObtainPairSerializer
from .models import Product,Purchase,HeaderImage
from django.db.models import Count,F,Sum
import random
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import joblib
import numpy as np
from datetime import datetime, timedelta
from django.db.models import Q
import uuid
import scipy.sparse
from rest_framework.permissions import BasePermission



# Replace "kmeans_Customer_Analysis.pkl" with your actual filename
tfidf_vectorizer = joblib.load('ml_models/ml_models/cosine/tfidf_vectorizer.pkl')
tfidf_matrix = joblib.load('ml_models/ml_models/cosine/tfidf_matrix.pkl')
product_indices = pd.read_csv('ml_models/ml_models/cosine/product_indices.csv')
# Compute cosine similarity between products
cosine_sim = cosine_similarity(tfidf_matrix)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    username = request.data.get('username_or_email')
    password = request.data.get('password')

    if not username or not password :
        return Response({'error': 'Username and password '}, status=status.HTTP_400_BAD_REQUEST)
    name=request.data.get("name") if request.data.get("name") !=None else  username.split("@")[0] if '@' in username else username
    email=request.data.get("email") if request.data.get("email") !=None else  username if '@' in username else '' 
    try:
        user, created = User.objects.get_or_create(username=username,email=email,name=name)
      
        if created:
                user.set_password(password)
                user.save()
                serializer=MyTokenObtainPairSerializer(data={"username":username,"email":email,"name":name,"password":password})
                serializer.is_valid(raise_exception=True)
                return Response({'refresh': str(serializer.validated_data["refresh"]),'access':serializer.validated_data['access']}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role=="manager" or request.user.role=="admin")
    

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a manager
        return request.user.is_authenticated and request.user.role=="admin"

@api_view(["GET","POST"])
@permission_classes([AllowAny])
def get_header(request):
    try:
        if request.method =="GET":
            type = request.query_params.get('type')
            if type:
                data=HeaderImage.objects.all()
                serial=HeaderSerializer(data,many=True)
                return Response(serial.data)
            else:
                data=HeaderImage.objects.all()
                number=random.randint(0,len(data)-1)
                if len(data)>5:
                    number=random.randint(0,4)

                data=data[number]
                serial=HeaderSerializer(data,many=False)
                return Response(serial.data)
        if request.method =="POST":
            id=request.data.get("id")
            HeaderImage.objects.get(product__product_id=id).delete()
            return Response({"result":"Header deleted.."},status=200)

    except Exception as e:
        return Response({"error":str(e)},status=400)





@api_view(["GET"])
@permission_classes([AllowAny])
def get_product_id(request,id):
    try:
        product=Product.objects.get(product_id=id)
        serial=ProductSerializer(product,many=False)
        recommended=find_similar_products(new_description=[product.description],num_similar=4)

        recommend_products=Product.objects.filter(product_id__in=recommended)
 
        serial_rec=ProductSerializer(recommend_products,many=True)
        return Response({"result":serial.data,"recommend":serial_rec.data})
    except Exception as e:
        print(str(e))
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_top_selling_products(request,period='week',limit=30):
    category = request.query_params.get('category')
    products=get_top_selling(period,limit,category)
 
    serial=ProductSerializer(products,many=True)
    return Response({"result":serial.data})


def get_top_selling(period="week",limit=30,category=None):
    if period == 'week':
        end_date = datetime.now()
        start_date = end_date - timedelta(days=14)
        top_selling_products=Purchase.objects
        if category and category!="null":
               
            top_selling_products = top_selling_products.filter(product__category__icontains=category).distinct()
    

        new_top=top_selling_products.filter(
            created_at__gte=start_date,
            created_at__lte=end_date
        ).values('product').annotate(total_sold=Sum('quantity')).order_by('-total_sold')
        products=[]
        
        for item in new_top[:limit]:
            products.append(Product.objects.get(id=item['product']))
        if len(products)<limit:

            products.extend(Product.objects.exclude(id__in=[product.id for product in products])[:limit-len(products)])
        return products


@api_view(['GET'])
@permission_classes([AllowAny])
def search_details(request,query):
    try:
        if not query:
            raise Exception("query is mising..")
        category = request.query_params.get('category')
        #products = get_top_selling(limit=20,name=query,category=category)
        top_products=Purchase.objects
        if query and query!="null":
            top_products=Product.objects.filter(name__icontains=query)
        if category and category!="null":
            query = Q()
            category=category.split(",")
            for c in category:
                query |= Q(category__icontains=c)
            top_products = top_products.filter(query).distinct()

        serial=ProductSerializer(top_products,many=True)
        return Response({"result":serial.data})
    
    except Exception as e:
        print(str(e))
        return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_details(request):
    user = User.objects.get(email="BASANTKUMARPRADHAN@gmail.com")
    print(user.username)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def predict_user_cluster(request,num):
    
    user = request.user
    descriptions = Product.objects.filter(purchases__user__id=user.id) \
                               .annotate(purchased_description=F('description')) \
                               .values('purchased_description')\
                               
                               
    if len(descriptions)>3:
        descriptions=descriptions.order_by('-purchases__created_at')[:3]
    
    recommend_products=[]

    if len(descriptions)>0:
        num_similar=int(int(num)/max(len(descriptions),1))
        purchased_descriptions = [item['purchased_description'] for item in list(descriptions)]
        product_id=find_similar_products(new_description=purchased_descriptions,num_similar=num_similar)

        recommend_products=Product.objects.filter(product_id__in=product_id)
    else:
        recommend_products=get_top_selling(limit=60)
    serial=ProductSerializer(recommend_products,many=True)
    return Response({"result":serial.data})




def add_new_product(new_description, product_id):
    try:
        global product_indices
        global tfidf_matrix
        if product_id in product_indices['id'].values:
            return False
        new_description_vec = tfidf_vectorizer.transform([new_description])
        
        
        tfidf_matrix = scipy.sparse.vstack([tfidf_matrix, new_description_vec])

        #joblib.dump(tfidf_matrix, 'ml_models/ml_models/cosine/tfidf_matrix.pkl')
        new_entry = pd.DataFrame({'index':len(product_indices),'id': [product_id]})
        product_indices = pd.concat([product_indices, new_entry], ignore_index=False)
        #product_indices.to_csv('ml_models/ml_models/cosine/product_indices.csv', index=False)
        
        return True
    except Exception as e:
        print(str(e))
        return False

@api_view(['POST'])
@permission_classes([IsManager])
def add_products(request):
    name=request.data.get('product_name')
    category=request.data.get('category')
    price=request.data.get('price')
    discount_percentage=request.data.get('discount_percentage')
    rating=request.data.get('rating')
    rating_count=request.data.get('rating_count')
    description=request.data.get('description')
    image_link=request.data.get('image_link')
    header=request.data.get('header')
    header_image=request.data.get('header_image')

    try:
        uuid_pro=uuid.uuid4()
        result = add_new_product(description, uuid_pro)
        if result:
            user=User.objects.get(username="srm")
            product=Product.objects.create(name=name,product_id=str(uuid_pro),category=category,price=float(price),discount_percentage=float(discount_percentage),rating=float(rating),rating_count=int(rating_count),description=description,image_link=image_link)
            if header and header_image:

                HeaderImage.objects.create(product=product,image_link=header_image)
            return Response({"result":"Product Addedd..."})
        
        else:
            raise Exception("Invalid Data...")
    except Exception as e:
        return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes([IsManager])
def get_remove_product(request):
    try:
        if request.method =="POST":
            id=request.data.get("id")
       
        if request.method=="GET":
            page=request.query_params.get("page")
            start=(int(page)-1)*50
            products=Product.objects.all()[start:start+50]
            serial=ProductSerializer(products,many=True)
            return Response({"result":serial.data})


        return Response({"result":"hello"})

    except Exception as e:
        print(str(e))
    pass
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_purchase(request):
    data=request.data.get("ids")
    for row in data:
        try:
            product=Product.objects.get(product_id=row["id"])
            user = User.objects.get(username=request.user)
            purchase=Purchase.objects.create(user=user,product=product,quantity=int(row["quantity"]))
            purchase.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"result":"Purchased Successful"})




def find_similar_products(new_description, num_similar=10):

    similar_products_global=[]
    def find_pro(des):
        new_description_vec = tfidf_vectorizer.transform([des])
        similarity_scores = cosine_similarity(new_description_vec, tfidf_matrix)[0]
        similarity_scores=np.array([score for score in similarity_scores ])
        similar_indices = similarity_scores.argsort()[-(num_similar+1):-1][::-1]
        similar_products = product_indices.iloc[similar_indices]
        similar_products_global.extend(similar_products["id"].tolist())
  
        
        
    for i in new_description:
        find_pro(des=i)
    return similar_products_global



@api_view(['GET'])
@permission_classes([IsManager])
def get_graph_data(request):
    try:
        data=pd.read_csv("graphs/test.csv")
        avg=pd.read_csv("graphs/avg_rating.csv")
        hist=pd.read_csv('graphs/hist1.csv')
        pie=pd.read_csv('graphs/pie1.csv')
        line=pd.read_csv('graphs/line1.csv')

        result={
            "result":{
                "line":[
                    {
                        "title":"Parallel Coordinate Plot of Product Attributes",
                        "data": [line["Rating"],line["Price"],line["Ratingcount"],line["Weightedrating"]],
                        'colors':['rgba(249,180,4,1)','rgba(11,156,49,1)','rgba(255,0,0,1)','rgba(135,206,235,1)'],
                        'xtitle':"Total Revenue",
                        'ytitle':"Category",
                    }
                ],

                "bar":[
                    {
                        "title":"Total Revenue Generated by Each Category",
                        "x": data["category"],
                        "y": data["discounted_price"],
                        'colors':'rgba(11,156,49,1)',
                        'xtitle':"Total Revenue",
                        'ytitle':"Category",
                    },
                    {
                        "title":"Average Ratings of Products in Each Category",
                        "x": avg["category"],
                        "y": avg["rating"],
                        'colors':'rgba(135,206,235,1)',
                        'xtitle':"Category",
                        'ytitle':"Average Rating",
                    },
                    {
                        "title":"Sentiment Distribution of Reviews (Top 50 Products)",
                        "x": ["Positive","Negative"],
                        "y":[49,1],
                        'colors':'rgba(11,156,49,1)',
                        'xtitle':"Sentiment",
                        'ytitle':"Count",

                    }
                ],
                "hist":[
                    {
                        "title":"Distribution of Rating Counts for Top 10 Products",
                        "frequencys": hist["Frequency"],
                        "bins":hist["Bin"],
                        'colors':'rgba(249,180,4,1)',
                        'xtitle':"Category",
                        'ytitle':"Average Rating",
                    }
                ],
                "pie":[
                    { 
                    "title":"Distribution of Products Across Main Categories",
                        "legendLabels": pie["Category"],
                        "data":pie["Count"],
                        'colors':['rgba(249,180,4,1)','rgba(11,156,49,1)','rgba(255,0,0,1)','rgba(135,206,235,1)','rgba(0,0,255,1)'],
                        
                    }
                    
                    
                ]
                
            }
        }
        return Response(result)
    except Exception as e:
        return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
    




