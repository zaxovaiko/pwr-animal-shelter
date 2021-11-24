from rest_framework.exceptions import ValidationError
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField
from animals.models import Animal, AnimalStatus
from reservations.models import AnimalReservation, ReservationStatus
from users.serializers import UserSerializer
from users.models import User
from animals.serializers import AnimalSerializer
from datetime import datetime
from dateutil.relativedelta import relativedelta


class ReservationStatusSerializer(ModelSerializer):
    value = CharField(required=True)

    class Meta:
        model = ReservationStatus
        fields = ['id', 'value']


class AnimalReservationsSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = PrimaryKeyRelatedField(
        source='user', queryset=User.objects.all(), required=True, write_only=True)
    animal = AnimalSerializer(read_only=True)
    animal_id = PrimaryKeyRelatedField(
        source='animal', queryset=Animal.objects.all(), required=True, write_only=True)
    reservation_status = ReservationStatusSerializer(read_only=True)
    reservation_status_id = PrimaryKeyRelatedField(
        source='reservation_status', queryset=ReservationStatus.objects.all(), required=True, write_only=True)
    date = DateTimeField(read_only=True)

    class Meta:
        model = AnimalReservation
        fields = ['id', 'user', 'animal', 'user_id', 'animal_id',
                  'reservation_status', 'reservation_status_id', 'date']

    def create(self, validated_data):
        validated_data['animal'].animal_status = AnimalStatus.objects.get(pk=4)
        validated_data['animal'].save()
        animal_reservation = super().create(validated_data)
        return animal_reservation

    def get_age_from_pesel(self, pesel_field):
        pesel = self.user.pesel
        year = str(pesel[0:2])
        month = str(pesel[2:4])
        day = str(pesel[4:6])

        date_time_str = F'{month}/{day}/{year} 00:00:00'
        date = datetime.strptime(date_time_str, '%m/%d/%y %H:%M:%S').date()

        date_now = datetime.now().date()

        difference_in_years = relativedelta(date_now, date).years

        return difference_in_years

    def validate(self, attrs):
        if self.get_age_from_pesel(attrs['user'].pesel) < 18:
            raise ValidationError('Użytkownik jest niepełnoletni')