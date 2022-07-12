from django.db import models

class Job(models.Model):
    title = models.TextField()
    description = models.TextField()
    time_a = models.BigIntegerField()
    time_b = models.BigIntegerField()
    from_id = models.IntegerField()
    user_type = models.TextField()
    enabled = models.BooleanField()
    post_time = models.BigIntegerField()
