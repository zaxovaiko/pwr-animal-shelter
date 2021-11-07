from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from adoptions.models import AnimalAdoption
from adoptions.serializers import AnimalAdotpionsSerializer


class AnimalAdoptionsViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalAdotpionsSerializer
    queryset = AnimalAdoption.objects.all()
    permission_classes = [IsAdminUser]
    model = AnimalAdoption
