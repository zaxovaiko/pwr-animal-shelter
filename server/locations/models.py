from django.db import models
from django.utils import timezone
from animals.models import Animal


class Building(models.Model):
    street = models.CharField("Ulica", max_length=100)
    number = models.PositiveIntegerField("Numer budynku")

    def __str__(self):
        return str(self.street) + " " + str(self.number)


class Room(models.Model):
    number = models.PositiveIntegerField("Numer pokoju")
    capacity = models.PositiveIntegerField("Ilość miejsc")
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='rooms')

    def __str__(self):
        return str(self.building) + "room:" + str(self.number)


class AnimalLocation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    date_from = models.DateTimeField(default=timezone.now)
    date_to = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.room) + " " + str(self.animal) + " " + str(self.date_from) + " " + str(self.date_to)
