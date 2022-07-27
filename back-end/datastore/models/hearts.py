from xmlrpc.client import Boolean
from django.db import models

class Heart(models.Model):
    job_id = models.IntegerField()
    user_id = models.IntegerField()
    flag = models.BooleanField(default=False)
    
    
