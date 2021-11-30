from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.test import APITestCase
from users.models import User
from animals.models import Animal


class AnimalsTests(APITestCase):
    multi_db=True
    animal = {
        "chip_code": "e122ojen31",
        "name": "Adam",
        "age": 4,
        "animal_type_id": 1,
        "animal_breed_id": 1,
        "animal_gender_id": 1,
        "animal_status_id": 1,
        "color": "biały",
        "height": 20,
        "weight": 34,
        "description": "Duży kot, który lubi mięso",
        "vaccinations": "Nie ma wakcynacji"
    }

    def setUp(self):
        self.user_data = {
            "email": "pracownik@gmail.com",
            "is_staff": True,
            "pesel": 11122233344,
            "first_name": "First_name",
            "last_name": "Last_name",
            "password": "password"
        }
        self.user = User.objects.create(**self.user_data)
        self.user.set_password(self.user_data['password'])
        self.user.save()

        response = self.client_class().post('/api/login', {
            'password': self.user_data['password'],
            'email': self.user_data['email']
        }, format='json')
        self.token = response.data['access']
        self.client = self.client_class()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_animal(self):
        res = self.client.post('/api/animals', self.animal, format='json')
        self.assertEqual(res.status_code, HTTP_201_CREATED)

    def test_create_invalid_animal(self):
        animal_copy = {**self.animal}
        animal_copy['chip_code'] = None
        res = self.client.post('/api/animals', animal_copy, format='json')
        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

    def test_retrieve_animal(self):
        animal = Animal.objects.create(**self.animal)
        res = self.client.get('/api/animals/' + str(animal.id))
        self.assertEqual(res.status_code, HTTP_200_OK)
        self.assertEqual(res.data['id'], animal.id)

    def test_retrieve_animal(self):
        animal = Animal.objects.first()
        res = self.client.get('/api/animals')
        self.assertEqual(res.status_code, HTTP_200_OK)
        self.assertEqual(res.data['results'][0]['id'], animal.id)
