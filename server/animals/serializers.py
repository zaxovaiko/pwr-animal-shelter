from rest_framework import serializers


class AnimalSerializer(serializers.Serializer):
    chip_code = serializers.CharField(max_length=100, required=True)
    name = serializers.CharField(max_length=100, required=True)
    age = serializers.IntegerField(min_value=0, required=True)
    animal_type = serializers.IntegerField(min_value=0, required=True)
    animal_breed = serializers.IntegerField(min_value=0, required=True)
    animal_gender = serializers.IntegerField(min_value=0, required=True)
    color = serializers.CharField(max_length=500, required=True)
    height = serializers.IntegerField(min_value=0, required=True)
    description = serializers.CharField(max_length=1000, required=True)
    vaccinations = serializers.CharField(max_length=1000, required=True)
    animal_status = serializers.IntegerField(min_value=0, required=True)