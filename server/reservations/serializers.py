from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField
from animals.models import Animal, AnimalStatus
from reservations.models import AnimalReservation, ReservationStatus
from users.serializers import UserSerializer
from users.models import User
from animals.serializers import AnimalSerializer


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