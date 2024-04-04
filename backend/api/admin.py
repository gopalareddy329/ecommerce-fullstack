from django.contrib import admin
from .models import User,Product,Purchase

# Register your models here.fr
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Purchase)