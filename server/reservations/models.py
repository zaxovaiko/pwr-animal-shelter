from django.db import models
from django.utils import timezone
from animals.models import Animal
# from django.core.exceptions import ValidationError
from django.db import DatabaseError
from rest_framework.exceptions import ValidationError
from users.models import User


class ReservationStatus(models.Model):
    value = models.CharField("Wartość", max_length=100,
                             unique=True, null=False)

    def __str__(self):
        return self.value


class AnimalReservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    animal = models.ForeignKey(Animal, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    reservation_status = models.ForeignKey(
        ReservationStatus, on_delete=models.PROTECT, null=False)

    def __str__(self):
        return str(self.user) + str(self.animal) + str(self.date)

    def save(self, *args, **kwargs):
        try:
            return super(AnimalReservation, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
