from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from .serializers import AnimalReservationsSerializer
from .models import AnimalReservation


class AnimalReservationsViewSet(viewsets.ModelViewSet):
    queryset = AnimalReservation.objects.all()
    serializer_class = AnimalReservationsSerializer

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        queryset = AnimalReservation.objects.filter(user=user_id)
        serializer = AnimalReservationsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'list':
            return [IsAuthenticated()]
        if self.action == 'retrieve':
            return [AllowAny()]
        return [IsAdminUser()]
