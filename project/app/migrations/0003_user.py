# Generated by Django 5.0.3 on 2024-03-08 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_inventoryitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('email', models.TextField()),
            ],
        ),
    ]
