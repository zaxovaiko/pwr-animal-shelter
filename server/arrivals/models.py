from django.db import models
from django.utils import timezone
from rest_framework.validators import ValidationError
from animals.models import Animal
from users.models import User


class AnimalArrival(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    animal = models.ForeignKey(Animal, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    first_name_of_surrender = models.CharField("Imię osoby przyprowadzającej", max_length=100, null=True)
    last_name_of_surrender = models.CharField("Nazwisko osoby przyprowadzającej", max_length=100, null=True)
    address_of_surrender = models.CharField("Adres osoby przyprowadzającej", max_length=200, null=True)

    def __str__(self):
        return str(self.animal) + " " + str(self.date)

    def save(self, *args, **kwargs):
        try:
            return super(AnimalArrival, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
