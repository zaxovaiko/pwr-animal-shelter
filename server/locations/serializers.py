from django.utils import timezone
from rest_framework.serializers import IntegerField, ModelSerializer, ValidationError, DateTimeField, CharField
from locations.models import Building, Room, AnimalLocation
from animals.serializers import AnimalSerializer


class BuildingSerializer(ModelSerializer):
    street = CharField(max_length=100, required=True)
    number = IntegerField(min_value=0, required=True)

    class Meta:
        model = Building
        fields = ['number', 'street', 'id', 'room_set']


class RoomSerializer(ModelSerializer):
    number = IntegerField(min_value=0, required=True)
    capacity = IntegerField(min_value=0, required=True)

    class Meta:
        model = Room
        fields = '__all__'


class AnimalLocationSerializer(ModelSerializer):
    room = RoomSerializer(read_only=True)
    room_id = IntegerField(required=True, write_only=True)
    animal = AnimalSerializer(read_only=True)
    animal_id = IntegerField(required=True, write_only=True)
    date_to = DateTimeField(required=False)

    class Meta:
        model = AnimalLocation
        fields = '__all__'

    def validate(self, attrs):
        if attrs['date_to'] <= timezone.now():
            raise ValidationError(
                "Move out date can not be earlier than today")
        return attrs
