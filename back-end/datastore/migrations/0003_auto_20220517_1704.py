# Generated by Django 3.2.5 on 2022-05-17 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datastore', '0002_registration'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registration',
            name='id',
        ),
        migrations.AlterField(
            model_name='registration',
            name='user_number',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
