# Generated by Django 5.0.3 on 2024-03-09 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_user_username_alter_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='roles',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
