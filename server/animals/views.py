from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from .serializers import AnimalSerializer
from .models import Animal


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def get_permissions(self):
        return [AllowAny()] if self.action == 'retrieve' or self.action == 'list' else [IsAdminUser()]
