from django.db import models
from django.contrib.auth.models import AbstractUser 

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=False)
    email = models.EmailField(unique=True, blank=True, null=True)
    

    def __str__(self):
        return self.email