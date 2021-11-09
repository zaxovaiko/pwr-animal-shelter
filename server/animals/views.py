import django_filters.rest_framework
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from .serializers import AnimalBreedSerializer, AnimalGenderSerializer, AnimalSerializer, AnimalStatusSerializer, AnimalTypeSerializer
from .models import Animal, AnimalBreed, AnimalGender, AnimalStatus, AnimalType


def get_shared_permissions(action):
    return [AllowAny()] if action == 'retrieve' or action == 'list' else [IsAdminUser()]


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['age', 'animal_type', 'animal_gender', 'animal_breed', 'animal_status', 'color']

    def get_permissions(self):
        return get_shared_permissions(self.action)


class AnimalTypeViewSet(viewsets.ModelViewSet):
    queryset = AnimalType.objects.all()
    serializer_class = AnimalTypeSerializer

    def get_permissions(self):
        return get_shared_permissions(self.action)


class AnimalGenderViewSet(viewsets.ModelViewSet):
    queryset = AnimalGender.objects.all()
    serializer_class = AnimalGenderSerializer

    def get_permissions(self):
        return get_shared_permissions(self.action)


class AnimalBreedViewSet(viewsets.ModelViewSet):
    queryset = AnimalBreed.objects.all()
    serializer_class = AnimalBreedSerializer

    def get_permissions(self):
        return get_shared_permissions(self.action)


class AnimalStatusViewSet(viewsets.ModelViewSet):
    queryset = AnimalStatus.objects.all()
    serializer_class = AnimalStatusSerializer

    def get_permissions(self):
        return get_shared_permissions(self.action)
