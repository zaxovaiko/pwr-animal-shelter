from django.db import models
from django.utils import timezone


# Create your models here.
from animals.models import Animal


class Building(models.Model):
    street = models.CharField("Ulica", max_length=100, help_text="")
    number = models.IntegerField("Numer budynku")

    def __str__(self):
        return str(self.street) + " " + str(self.number)


class Room(models.Model):
    number = models.IntegerField("Numer pokoju")
    capacity = models.IntegerField("Ilość miejsc")
    building = models.ForeignKey(Building, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.building) + "room:" + str(self.number)


class AnimalLocation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    date_from = models.DateTimeField(default=timezone.now)
    date_to = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.room) + " " + str(self.animal) + " " + str(self.date_from) + " " + str(self.date_to)
