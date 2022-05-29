from django.db import models

class Application(models.Model):
    babysitter_id = models.IntegerField()
    job_id = models.IntegerField()
    cover_letter = models.TextField()
