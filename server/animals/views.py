import django_filters.rest_framework
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .serializers import AnimalBreedSerializer, AnimalGenderSerializer, AnimalImageSerializer, AnimalSerializer, AnimalStatusSerializer, AnimalTypeSerializer
from .models import Animal, AnimalBreed, AnimalGender, AnimalStatus, AnimalType


def get_shared_permissions(action):
    return [AllowAny()] if action == 'retrieve' or action == 'list' else [IsAdminUser()]


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['age', 'animal_type', 'animal_gender',
                        'animal_breed', 'animal_status', 'color']

    def create(self, request, *args, **kwargs):
        animal_serializer = AnimalSerializer(data=request.data, context={'request': request})
        
        if not animal_serializer.is_valid():
            return Response(animal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        animal = animal_serializer.save()
        is_correct = True
        images = []
        for image in request.FILES.getlist('images'):
            image_serializer = AnimalImageSerializer(data={'animal': animal.id, 'image': image})
            if image_serializer.is_valid():
                image_serializer.save()
                images.append(image_serializer.data)
            else:
                is_correct = False
        if is_correct:
            return Response({ **animal_serializer.data, 'images': images }, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid data or images'}, status=status.HTTP_400_BAD_REQUEST)

    def attach_images(self, request):
        pass

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
