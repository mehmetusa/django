from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class React(models.Model):
    itemName = models.CharField(max_length=200,null=True)
    category = models.CharField(max_length=200,null=True)
    department = models.CharField(max_length=200,null=True)
    listPrice= models.DecimalField(max_digits=10, decimal_places=2,null=True)
    sale = models.BooleanField(default=False)
    cost = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    quantity = models.IntegerField(null=True)
    date_created = models.DateField(default=timezone.now)

class User(AbstractUser):
    username = models.CharField(max_length=255,null=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255,null=True)
    is_staff = models.BooleanField(default=False)
    roles = models.CharField(max_length=255,null=True)
    date_created = models.DateField(default=timezone.now)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
