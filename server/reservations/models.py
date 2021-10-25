from django.db import models

# Create your models here.

from django.utils import timezone

from animals.models import Animal
from users.models import Person


class ReservationStatus(models.Model):
    value = models.CharField("Wartość", max_length=100, unique=True, null=False, help_text="")


class AnimalReservation(models.Model):
    person = models.ForeignKey(Person, on_delete=models.PROTECT)
    animal = models.ForeignKey(Animal, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    reservation_status = models.ForeignKey(ReservationStatus, on_delete=models.PROTECT, null=False)

