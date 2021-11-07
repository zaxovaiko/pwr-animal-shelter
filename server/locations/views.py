from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework_extensions.mixins import NestedViewSetMixin
from locations.models import Building, Room, AnimalLocation
from locations.serializers import BuildingSerializer, RoomSerializer, AnimalLocationSerializer


class BuildingViewSet(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.prefetch_related('room_set').all()
    permission_classes = [IsAdminUser]
    model = Building


class RoomViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    permission_classes = [IsAdminUser]
    model = Room

    @property
    def building(self):
        return get_object_or_404(Building, pk=self.kwargs.get('parent_lookup_building'))

    def perform_create(self, serializer):
        serializer.save(building=self.building)


class AnimalLocationViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalLocationSerializer
    queryset = AnimalLocation.objects.all()
    permission_classes = [IsAdminUser]
    model = AnimalLocation
