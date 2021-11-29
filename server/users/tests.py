from django.test import TestCase
from users.models import User


class UserTestCase(TestCase):
    def setUp(self):
        user = {
          "first_name": "first_name",
          "last_name": "last_name",
          "password": "password",
          "email": "email@gmail.com",
          "pesel": 11122233344
        }
        another_user = { **user }
        another_user['email'] = 'anotheremail@gmail.com' 
        User.objects.create(**user)
        User.objects.create(**another_user)

    def test_users_have_appropriate_role(self):
        user1 = User.objects.get(email="email@gmail.com")
        user2 = User.objects.get(name="anotheremail@gmail.com")
        self.assertIsNone(user1)
        self.assertIsNone(user2)