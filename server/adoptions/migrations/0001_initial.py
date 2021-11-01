# Generated by Django 3.2.8 on 2021-10-30 19:25

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('animals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnimalAdoption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='animals.animal')),
            ],
        ),
    ]