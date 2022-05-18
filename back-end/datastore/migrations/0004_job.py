# Generated by Django 3.2.5 on 2022-05-18 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datastore', '0003_auto_20220517_1704'),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('time_a', models.BigIntegerField()),
                ('time_b', models.BigIntegerField()),
                ('parent_id', models.IntegerField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
    ]