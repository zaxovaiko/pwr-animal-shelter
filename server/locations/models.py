from django.db import models
from django.utils import timezone


# Create your models here.
from server.animals.models import Animal


class Building(models.Model):
    street = name = models.CharField("Ulica", max_length=100, help_text="")
    number = models.IntegerField("Numer budynku")


class Room(models.Model):
    number = models.IntegerField("Numer pokoju")
    capacity = models.IntegerField("Ilość mieść")
    building = models.ForeignKey("Budynek", Building, on_delete=models.CASCADE)


class AnimalLocation(models.Model):
    room = models.ForeignKey("Zwierze", Room, on_delete=models.CASCADE)
    animal = models.ForeignKey("Zwierze", Animal, on_delete=models.CASCADE)
    date_from = models.DateTimeField(default=timezone.now)
    date_to = models.DateTimeField(null=True)
