from django.db import models

class Registration(models.Model):
    user_number = models.IntegerField(primary_key=True)
    registration_type = models.IntegerField()
