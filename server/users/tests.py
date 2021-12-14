from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from users.models import User, image_path


class UserTestCase(APITestCase):
    user_data = {
        "email": "testuser@gmail.com",
        "pesel": 56020498194,
        "first_name": "User_first",
        "last_name": "User_last",
        "address": "ul. Wróblewskiego 2, 65, Wrocław",
        "password": "password"
    }

    def setUp(self):
        self.user = User.objects.create(**self.user_data)
        self.user.set_password(self.user_data['password'])
        self.user.save()

    def test_create_user(self):
        user_data_copy = {**self.user_data}
        user_data_copy['email'] = 'anothertestuser@gmail.com'
        user_data_copy['pesel'] = 80052155415
        response = self.client_class().post(
            '/api/register', user_data_copy, format='json')
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    def test_create_user_again(self):
        response = self.client_class().post(
            '/api/register', self.user_data, format='json')
        self.assertNotEqual(response.status_code, HTTP_201_CREATED)

    def test_login_user(self):
        response = self.client_class().post('/api/login',
                                            {'password': self.user_data['password'], 'email': self.user_data['email']}, format='json')
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_create_bad_name_user(self):
        user_data_copy = {**self.user_data}
        user_data_copy['email'] = 'unique@gmail.com'
        user_data_copy['pesel'] = 90031375116
        user_data_copy['first_name'] = ''
        response = self.client_class().post(
            '/api/register', user_data_copy, format='json')
        self.assertNotEqual(response.status_code, HTTP_201_CREATED)


class UnitTests(TestCase):
    def test_image_path(self):
        filename = 'default_image.jpg'
        path = image_path(None, filename)
        folder, file = path.split('/')
        self.assertIsNotNone(file)
        self.assertEqual(folder, 'users')
        self.assertIn('jpg', file)