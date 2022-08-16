from django.db import models

class Schedule(models.Model):

    user_number = models.IntegerField(primary_key=True)
    sun_mor = models.BooleanField(default=False)
    sun_aft = models.BooleanField(default=False)
    sun_eve = models.BooleanField(default=False)
    sun_nig = models.BooleanField(default=False)

    mon_mor = models.BooleanField(default=False)
    mon_aft = models.BooleanField(default=False)
    mon_eve = models.BooleanField(default=False)
    mon_nig = models.BooleanField(default=False)

    tue_mor = models.BooleanField(default=False)
    tue_aft = models.BooleanField(default=False)
    tue_eve = models.BooleanField(default=False)
    tue_nig = models.BooleanField(default=False)

    wed_mor = models.BooleanField(default=False)
    wed_aft = models.BooleanField(default=False)
    wed_eve = models.BooleanField(default=False)
    wed_nig = models.BooleanField(default=False)

    thu_mor = models.BooleanField(default=False)
    thu_aft = models.BooleanField(default=False)
    thu_eve = models.BooleanField(default=False)
    thu_nig = models.BooleanField(default=False)

    fri_mor = models.BooleanField(default=False)
    fri_aft = models.BooleanField(default=False)
    fri_eve = models.BooleanField(default=False)
    fri_nig = models.BooleanField(default=False)

    sat_mor = models.BooleanField(default=False)
    sat_aft = models.BooleanField(default=False)
    sat_eve = models.BooleanField(default=False)
    sat_nig = models.BooleanField(default=False)
