# Generated by Django 4.0.4 on 2022-08-02 06:28

import datastore.models.registrations
import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_id', models.IntegerField()),
                ('job_id', models.IntegerField()),
                ('cover_letter', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.IntegerField()),
                ('from_id', models.IntegerField()),
                ('description', models.TextField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Heart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.IntegerField()),
                ('user_id', models.IntegerField()),
                ('flag', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('time_a', models.TextField()),
                ('time_b', models.TextField()),
                ('from_id', models.IntegerField()),
                ('user_type', models.TextField()),
                ('enabled', models.BooleanField(default=True)),
                ('post_time', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_id', models.IntegerField()),
                ('author_id', models.IntegerField()),
                ('contents', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('user_number', models.IntegerField(primary_key=True, serialize=False)),
                ('registration_type', models.IntegerField()),
                ('username', models.CharField(blank=True, max_length=500, null=True)),
                ('loc', models.TextField()),
                ('short_info', models.TextField(blank=True, null=True)),
                ('rating', models.FloatField()),
                ('age', models.IntegerField(blank=True, default=0, null=True)),
                ('gender', models.IntegerField()),
                ('exp_years', models.IntegerField(blank=True, default=0, null=True)),
                ('price', models.IntegerField(blank=True, default=0, null=True)),
                ('education', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=200, null=True)),
                ('house_number', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('street_name', models.CharField(blank=True, max_length=200, null=True)),
                ('child_care', models.IntegerField(blank=True, default=0, null=True)),
                ('have_children', models.BooleanField(default=False)),
                ('have_drive_license', models.BooleanField(default=False)),
                ('smoking', models.BooleanField(default=False)),
                ('remotely', models.BooleanField(default=False)),
                ('have_experience_special', models.BooleanField(default=False)),
                ('school_help', models.BooleanField(default=False)),
                ('num_of_children', models.IntegerField(blank=True, default=0, null=True)),
                ('help_type', models.CharField(blank=True, max_length=500, null=True)),
                ('child_type', models.CharField(blank=True, max_length=500, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=datastore.models.registrations.content_file_user)),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_id', models.IntegerField()),
                ('from_id', models.IntegerField()),
                ('description', models.TextField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('to_id', models.IntegerField()),
                ('from_id', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('description', models.TextField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('user_number', models.IntegerField(primary_key=True, serialize=False)),
                ('sun_mor', models.BooleanField(default=False)),
                ('sun_aft', models.BooleanField(default=False)),
                ('sun_eve', models.BooleanField(default=False)),
                ('sun_nig', models.BooleanField(default=False)),
                ('mon_mor', models.BooleanField(default=False)),
                ('mon_aft', models.BooleanField(default=False)),
                ('mon_eve', models.BooleanField(default=False)),
                ('mon_nig', models.BooleanField(default=False)),
                ('tue_mor', models.BooleanField(default=False)),
                ('tue_aft', models.BooleanField(default=False)),
                ('tue_eve', models.BooleanField(default=False)),
                ('tue_nig', models.BooleanField(default=False)),
                ('wed_mor', models.BooleanField(default=False)),
                ('wed_aft', models.BooleanField(default=False)),
                ('wed_eve', models.BooleanField(default=False)),
                ('wed_nig', models.BooleanField(default=False)),
                ('thu_mor', models.BooleanField(default=False)),
                ('thu_aft', models.BooleanField(default=False)),
                ('thu_eve', models.BooleanField(default=False)),
                ('thu_nig', models.BooleanField(default=False)),
                ('fri_mor', models.BooleanField(default=False)),
                ('fri_aft', models.BooleanField(default=False)),
                ('fri_eve', models.BooleanField(default=False)),
                ('fri_nig', models.BooleanField(default=False)),
                ('sat_mor', models.BooleanField(default=False)),
                ('sat_aft', models.BooleanField(default=False)),
                ('sat_eve', models.BooleanField(default=False)),
                ('sat_nig', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.TextField()),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.IntegerField()),
                ('from_id', models.IntegerField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Watch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('friend_id', models.IntegerField()),
                ('from_id', models.IntegerField()),
                ('enabled', models.BooleanField()),
                ('post_time', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
