from django.contrib import admin

# Register your models here.
from reservations.models import *

admin.site.register(ReservationStatus)
admin.site.register(AnimalReservation)
