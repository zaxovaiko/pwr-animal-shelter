from rest_framework import serializers
from locations.models import Building, Room


class BuildingSerializer(serializers.ModelSerializer):
    street = serializers.CharField(max_length=100, required=True)
    number = serializers.IntegerField(min_value=0, required=True)

    class Meta:
        model = Building
        fields = ['number', 'street', 'id', 'room_set']


class RoomSerializer(serializers.ModelSerializer):
    number = serializers.IntegerField(min_value=0, required=True)
    capacity = serializers.IntegerField(min_value=0, required=True)

    class Meta:
        model = Room
        fields = ['id', 'capacity', 'number']
