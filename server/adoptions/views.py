import django_filters.rest_framework
from rest_framework import filters, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from adoptions.models import AnimalAdoption
from adoptions.serializers import AnimalAdotpionsSerializer


class AnimalAdoptionViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalAdotpionsSerializer
    queryset = AnimalAdoption.objects.all()
    model = AnimalAdoption
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'date', 'animal']
    ordering_fields = ['date']

    def get_permissions(self):
        return [AllowAny()]

    def adopted(self, request, *args, **kwargs):
        user_id = request.user.id
        queryset = AnimalAdoption.objects.filter(user=user_id)
        serializer = AnimalAdotpionsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
