# myapp/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User 
from django.views.decorators.csrf import csrf_exempt
from .serializer import UserSerializer,ProductSerializer
from .token import MyTokenObtainPairSerializer
from .models import Product,Purchase
from django.db.models import Count,F,Sum
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import joblib
import numpy as np
from datetime import datetime, timedelta
from django.db.models import Q


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
        print(username,name)
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


def get_top_selling(period="week",limit=30,category=None,name=None):
    if period == 'week':
        end_date = datetime.now()
        start_date = end_date - timedelta(days=14)
        top_selling_products=Purchase.objects
        if name and name!="null":
            top_selling_products=Purchase.objects.filter(product__name__icontains=name)
        if category and category!="null":
            query = Q()
            category=category.split(",")
            for c in category:
                query |= Q(product__category__icontains=c)
                print(query)

            top_selling_products = top_selling_products.filter(query).distinct()
            #print(Purchase.objects.filter(product__category__in__icontains=category))

        new_top=top_selling_products.filter(
            created_at__gte=start_date,
            created_at__lte=end_date
        ).values('product').annotate(total_sold=Sum('quantity')).order_by('-total_sold')[:limit]
        products=[]
        for item in new_top:
            products.append(Product.objects.get(id=item['product']))
        if len(products)<30:
            products.extend(Product.objects.exclude(product_id__in=products)[:30-len(products)])
        return products


@api_view(['GET'])
@permission_classes([AllowAny])
def search_details(request,query):
    try:
        if not query:
            raise Exception("query is mising..")
        category = request.query_params.get('category')
       
        products=get_top_selling(limit=20,name=query,category=category)
        serial=ProductSerializer(products,many=True)
        return Response({"result":serial.data})
    
    except Exception as e:
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
        similarity_scores=np.array([score for score in similarity_scores if score < 0.99])
        similar_indices = similarity_scores.argsort()[-num_similar:][::-1]
        similar_products = product_indices.iloc[similar_indices]
        similar_products_global.extend(similar_products["id"].tolist())
        
    

    for i in new_description:
        find_pro(des=i)
    return similar_products_global



@api_view(['GET'])
@permission_classes([AllowAny])
def get_graph_data(request):
    data=pd.read_csv("/Users/gopalareddy/Desktop/all_python/ml_train/cosine/test.csv")
    avg=pd.read_csv("/Users/gopalareddy/Desktop/all_python/ml_train/cosine/avg_rating.csv")
    hist=pd.read_csv('/Users/gopalareddy/Desktop/all_python/ml_train/cosine/hist1.csv')
    pie=pd.read_csv('/Users/gopalareddy/Desktop/all_python/ml_train/cosine/pie1.csv')
    line=pd.read_csv('/Users/gopalareddy/Desktop/all_python/ml_train/cosine/line1.csv')

    result={
        "result":{
            "line":[
                {
                    "title":"Parallel Coordinate Plot of Product Attributes",
                    "data": [line["Rating"],line["Price"],line["Ratingcount"],line["Weightedrating"]],
                    'colors':'rgba(11,156,49,1)',
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
                    "title":"Average Ratings of Products in Each Category",
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