from django.db import models

class Chat(models.Model):
    job_id = models.IntegerField()
    babysitter_id = models.IntegerField()
