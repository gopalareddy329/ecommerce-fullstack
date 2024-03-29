from django.contrib import admin
from .models import User,UserInfo,Product,Purchase

# Register your models here.fr
admin.site.register(User)
admin.site.register(UserInfo)
admin.site.register(Product)
admin.site.register(Purchase)