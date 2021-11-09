import django_filters.rest_framework
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .serializers import AnimalArrivalsSerializer
from .models import AnimalArrival


class AnimalArrivalsViewSet(viewsets.ModelViewSet):
    queryset = AnimalArrival.objects.all()
    serializer_class = AnimalArrivalsSerializer
    permissions_class = [IsAdminUser]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['user', 'first_name_of_surrender', 'last_name_of_surrender', 'date']
