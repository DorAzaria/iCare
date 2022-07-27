from django.db import models
from sqlalchemy import false


def content_file_user(instance, filename):
    return 'static/profile/{1}'.format(instance, filename)

class Registration(models.Model):
    #common information
    user_number = models.IntegerField(primary_key=True)
    registration_type = models.IntegerField()
    username = models.CharField(max_length=500, null=True, blank=True)

    loc = models.TextField()
    short_info = models.TextField(null=True, blank=True)
    rating = models.FloatField()
    #information for babby sitter
    age = models.IntegerField(default=0, null=True, blank=True)
    gender = models.IntegerField()
    exp_years = models.IntegerField(default=0, null=True, blank=True)
    price = models.IntegerField(default=0, null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    house_number = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    street_name = models.CharField(max_length=200, null=True, blank=True)
    child_care = models.IntegerField(default=0, null=True, blank=True) #skills
    have_children = models.BooleanField(default=False)
    have_drive_license = models.BooleanField(default=False)
    smoking = models.BooleanField(default=False)
    remotely = models.BooleanField(default=False)
    have_experience_special = models.BooleanField(default=False)
    school_help = models.BooleanField(default=False)
    #information for parents
    num_of_children = models.IntegerField(default=0, null=True, blank=True)
    help_type = models.CharField(max_length=500, null=True, blank=True)
    child_type = models.CharField(max_length=500, null=True, blank=True)

    avatar = models.ImageField(blank=True,upload_to=content_file_user, null=True)


