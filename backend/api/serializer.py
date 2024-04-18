# myapp/serializers.py
from rest_framework import serializers
from .models import User,Product,HeaderImage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'


class HeaderSerializer(serializers.ModelSerializer):
    product_product_id = serializers.PrimaryKeyRelatedField(source='product.product_id', read_only=True)

    class Meta:
        model=HeaderImage
        fields=['title','image_link','product_product_id']

