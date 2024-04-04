# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .views import register,get_user_details,predict_user_cluster,get_top_selling_products \
                    ,get_product_id,update_user_purchase
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
    path('update_user_purchase/', update_user_purchase),


]

"getCarts/<str:id>/<str:name>"