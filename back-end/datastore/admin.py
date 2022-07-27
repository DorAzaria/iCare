from django.contrib import admin
from .models import *

class MyUserAdmin(admin.ModelAdmin):
    list_display=['email', 'pk']

# Register your models here.
admin.site.register(Application)
admin.site.register(Chat)
admin.site.register(Comment)
admin.site.register(Job)
admin.site.register(Registration)
admin.site.register(Reply)
admin.site.register(Review)
admin.site.register(Session)
admin.site.register(Vote)
admin.site.register(Schedule)
admin.site.register(User, MyUserAdmin)
