# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .views import register,get_user_details,predict_user_cluster,get_top_selling_products \
                    ,get_product_id,update_user_purchase,search_details,get_graph_data,add_products,get_header,\
                    get_remove_product
from .token import MyTokenObtainPairView


from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('get_user_data/', get_user_details, name='get_user_details'),
    path('predict_user/<str:num>/', predict_user_cluster),
    path('top_selling/', get_top_selling_products),
    path('get_product_id/<str:id>/', get_product_id),
    path('get_header/', get_header),
    path('search_product/<str:query>/', search_details),
    path('get_remove_product/', get_remove_product),




    path('update_user_purchase/', update_user_purchase),
    path('get_graph_data/', get_graph_data),
    path('add_products/', add_products),


]

"getCarts/<str:id>/<str:name>"