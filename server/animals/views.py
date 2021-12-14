import django_filters.rest_framework
from rest_framework import filters, status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .serializers import AnimalBreedSerializer, AnimalGenderSerializer, AnimalImageSerializer, AnimalSerializer, AnimalStatusSerializer, AnimalTypeSerializer
from .models import Animal, AnimalBreed, AnimalGender, AnimalStatus, AnimalType


def get_shared_permissions(action):
    return [AllowAny()] if action == 'retrieve' or action == 'list' else [IsAdminUser()]


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['age', 'animal_type', 'animal_gender',
                        'animal_breed', 'animal_status', 'color']
    ordering_fields = ['age', 'weight', 'height', 'animal_status', 'animal_greed', 'animal_type']

    def attach_files_decorator(func):
        def wrapper(*args, **kwargs):
            model, request, data = func(*args, **kwargs)
            if len(request.FILES.getlist('images')) == 0 and 'images' in request.data:
                model.images.all().delete()

            is_correct = True
            images = list(AnimalImageSerializer(model.images.all(), many=True).data)
            for image in request.FILES.getlist('images'):
                image_serializer = AnimalImageSerializer(data={'animal': model.id, 'image': image})
                if image_serializer.is_valid():
                    image_serializer.save()
                    images.append(image_serializer.data)
                else:
                    is_correct = False
            if is_correct:
                return Response({ **data, 'images': images }, status=status.HTTP_201_CREATED)
            return Response({'error': 'Invalid images'}, status=status.HTTP_400_BAD_REQUEST)
        return wrapper

    @attach_files_decorator
    def create(self, request):
        animal_serializer = AnimalSerializer(data=request.data, context={'request': request})
        animal_serializer.is_valid(raise_exception=True)
        animal = animal_serializer.save()
        return animal, request, animal_serializer.data

    @attach_files_decorator
    def update(self, request, *args, **kwargs):
        animal = self.get_object()
        if 'partial' not in kwargs:
            kwargs['partial'] = False
        animal_serializer = AnimalSerializer(animal, data=request.data, partial=kwargs['partial'])
        animal_serializer.is_valid(raise_exception=True)
        animal = animal_serializer.save()
        return animal, request, animal_serializer.data

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
