from django.db import models
from django.contrib.auth.models import AbstractUser


class React(models.Model):
    itemName = models.CharField(max_length=200,null=True)
    category = models.CharField(max_length=200,null=True)
    department = models.CharField(max_length=200,null=True)
    listPrice= models.DecimalField(max_digits=10, decimal_places=2,null=True)
    sale = models.BooleanField(default=False)
    cost = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    quantity = models.IntegerField(null=True)

class InventoryItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.IntegerField()

class User(AbstractUser):
    username = models.CharField(max_length=255,null=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255,null=True)
    is_staff = models.BooleanField(default=False)
    roles = models.CharField(max_length=255,null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
