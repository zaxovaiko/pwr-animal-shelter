from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .serializers import AnimalSerializer
from .models import Animal


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAdminUser]
