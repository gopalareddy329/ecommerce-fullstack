# myapp/models.py
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models




class Product(models.Model):
    name=models.TextField(blank=True,null=True)
    product_id=models.TextField(unique=True,null=True)
    category=models.TextField( blank=True)
    price=models.FloatField(default=0)
    discount_percentage=models.FloatField(default=0)
    rating=models.FloatField(default=0)
    rating_count=models.PositiveIntegerField(default=0)
    description=models.TextField(null=True,blank=True)
    review=models.TextField(null=True,blank=True)
    image_link=models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f'{self.name[:20]}'
    
class User(AbstractUser):
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('manager', 'Manager'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES,default='customer')
    name=models.CharField(_("Name of User"), blank=True, max_length=255)
    products=models.ManyToManyField(Product,related_name='products',blank=True)

class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    # Add any other fields you need for your purchase model

    def __str__(self):
        return f'{self.product.product_id}  purchased by {self.user.username}'


class HeaderImage(models.Model):
    title=models.TextField(null=True,blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image_link=models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']
    def save(self,*args,**kwargs):
        if self.product and not self.title:
            self.title = self.product.name
        super().save(*args,**kwargs)
    def __str__(self):
        return self.title

    





