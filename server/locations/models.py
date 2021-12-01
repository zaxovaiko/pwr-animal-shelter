from django.db import models
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from animals.models import Animal


class Building(models.Model):
    street = models.CharField("Ulica", max_length=100)
    number = models.PositiveIntegerField("Numer budynku")

    def __str__(self):
        return str(self.street) + " " + str(self.number)

    class Meta:
        verbose_name = 'Budynek'
        verbose_name_plural = 'Budynki'


class Room(models.Model):
    number = models.PositiveIntegerField("Numer pokoju")
    capacity = models.PositiveIntegerField("Ilość miejsc")
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='rooms')

    def __str__(self):
        return str(self.building) + " pokój " + str(self.number)

    class Meta:
        verbose_name = 'Pokój'
        verbose_name_plural = 'Pokoje'


class AnimalLocation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.PROTECT, verbose_name="Pokój")
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, verbose_name="Zwierzę")
    date_from = models.DateTimeField(default=timezone.now, verbose_name="Data od")
    date_to = models.DateTimeField(null=True, blank=True, verbose_name="Data do")

    def __str__(self):
        return str(self.room) + " " + str(self.animal) + " " + str(self.date_from) + " " + str(self.date_to)

    class Meta:
        verbose_name = 'Lokalizacja Zwierzęcia'
        verbose_name_plural = 'Lokalizacje Zwierząt'

    def save(self, *args, **kwargs):
        try:
            return super(AnimalLocation, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
