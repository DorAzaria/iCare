# Generated by Django 3.2.5 on 2022-05-16 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datastore', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_number', models.IntegerField()),
                ('registration_type', models.IntegerField()),
            ],
        ),
    ]
