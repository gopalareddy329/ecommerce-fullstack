# myapp/models.py
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models


class UserInfo(models.Model):
    MARITAL_STATUS_CHOICES = [
        ('Married', 'Married'),
        ('Single', 'Single'),
        ('Together', 'Together'),
        ('Divorced', 'Divorced'),
        ('Widow', 'Widow'),
        ('Alone', 'Alone'),
        ('Absurd', 'Absurd'),
        ('YOLO', 'YOLO'),
    ]
    EDUCATION_CHOICES = [
        ('Graduation', 'Graduation'),
        ('PhD', 'PhD'),
        ('Master', 'Master'),
        ('Basic', 'Basic'),
        ('2n Cycle', '2n Cycle'),
    
    ]
    Year_Birth=models.CharField(max_length=20,blank=True,null=True)
    Marital_Status=models.CharField(max_length=20,choices=MARITAL_STATUS_CHOICES,blank=True,null=True)
    Education=models.CharField(max_length=20,choices=EDUCATION_CHOICES,blank=True,null=True)
    Income=models.PositiveIntegerField(default=0,blank=True,null=True)
    Dt_Customer=models.DateField(blank=True,null=True)


    def __str__(self):
        return self.user.username

class Product(models.Model):
    name=models.CharField(max_length=50,blank=True,null=True)
    category=models.CharField( blank=True, max_length=255)
    def __str__(self):
        return self.name
    
class User(AbstractUser):
    name=models.CharField(_("Name of User"), blank=True, max_length=255)
    info=models.OneToOneField(UserInfo,on_delete=models.CASCADE,null=True,blank=True)
    products=models.ManyToManyField(Product,related_name='products',blank=True)

class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,null=True, related_name='purchases')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    # Add any other fields you need for your purchase model

    def __str__(self):
        return f'{self.quantity} of {self.product.name} purchased by {self.user.username}'

    





