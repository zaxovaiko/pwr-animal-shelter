from django.db import models
from django.utils import timezone


# Create your models here.
from animals.models import Animal


class Building(models.Model):
    street = models.CharField("Ulica", max_length=100, help_text="")
    number = models.IntegerField("Numer budynku")


class Room(models.Model):
    number = models.IntegerField("Numer pokoju")
    capacity = models.IntegerField("Ilość mieść")
    building = models.ForeignKey(Building, on_delete=models.CASCADE)


class AnimalLocation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    date_from = models.DateTimeField(default=timezone.now)
    date_to = models.DateTimeField(null=True)
