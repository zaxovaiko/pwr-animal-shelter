from django.contrib import admin

# Register your models here.
from locations.models import *

admin.site.register(Building)
admin.site.register(Room)
admin.site.register(AnimalLocation)