# myapp/models.py
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models

class User(AbstractUser):
    name=models.CharField(_("Name of User"), blank=True, max_length=255)
    pass

