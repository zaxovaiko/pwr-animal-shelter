from django.db import models
from django.utils import timezone
from animals.models import Animal
from django.db import DatabaseError
from rest_framework.exceptions import ValidationError
from users.models import User


class ReservationStatus(models.Model):
    value = models.CharField("Wartość", max_length=100,
                             unique=True, null=False)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Status Rezerwacji'
        verbose_name_plural = 'Statusy Rezerwacji'


class AnimalReservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="Użytkownik")
    animal = models.ForeignKey(Animal, on_delete=models.PROTECT, verbose_name="Zwierzę")
    date = models.DateTimeField(verbose_name="Data", default=timezone.now)
    reservation_status = models.ForeignKey(
        ReservationStatus, on_delete=models.PROTECT, null=False, verbose_name="Status Rezerwacji")

    def __str__(self):
        return f'{str(self.user)} {str(self.animal)} {str(self.date)}'

    class Meta:
        verbose_name = 'Rezerwacja Zwierzęica'
        verbose_name_plural = 'Rezerwacje Zwierząt'

    def save(self, *args, **kwargs):
        try:
            return super(AnimalReservation, self).save(*args, **kwargs)
        except BaseException as e:
            raise ValidationError({ 'error': str(e).split('\n')[0] })
