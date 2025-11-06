from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
	"""Custom user model; uses default AbstractUser fields for basic info."""
	pass




class Student(models.Model):
	# Text-based unique identifier as primary key
	id = models.CharField(max_length=64, primary_key=True, unique=True)
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True,default='placeholder@email.com')
	image = models.URLField(blank = True, null = True)
	# Store hashed password (Django PBKDF2-compatible)
	password = models.CharField(max_length=128)

	def __str__(self) -> str:
		return self.id


