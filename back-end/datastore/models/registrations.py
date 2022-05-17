from django.db import models

class Registration(models.Model):
    user_number = models.IntegerField()
    registration_type = models.IntegerField()
