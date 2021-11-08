from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .serializers import AnimalArrivalsSerializer
from .models import AnimalArrival


class AnimalArrivalsViewSet(viewsets.ModelViewSet):
    queryset = AnimalArrival.objects.all()
    serializer_class = AnimalArrivalsSerializer
    permissions_class = [IsAdminUser]
