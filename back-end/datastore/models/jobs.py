from django.db import models

class Job(models.Model):
    title = models.TextField()
    description = models.TextField()
    time_a = models.BigIntegerField()
    time_b = models.BigIntegerField()
    parent_id = models.IntegerField()
    enabled = models.BooleanField()
    post_time = models.BigIntegerField()
