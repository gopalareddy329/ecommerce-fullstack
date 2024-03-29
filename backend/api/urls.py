# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .views import register,get_user_details,predict_user_cluster,get_personal_info
from .token import MyTokenObtainPairView


from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('get_user_data/', get_user_details, name='get_user_details'),
    path('get_personal_info/', get_personal_info, name='get_personal_info'),
    path('predict_user/', predict_user_cluster),
]

"getCarts/<str:id>/<str:name>"