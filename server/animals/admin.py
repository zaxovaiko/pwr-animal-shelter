from django.contrib import admin

# Register your models here.
from animals.models import *

admin.site.register(AnimalBreed)
admin.site.register(AnimalGender)
admin.site.register(AnimalType)
admin.site.register(AnimalStatus)
admin.site.register(Animal)
