from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction
from .models import Student

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'email', 'image')
        extra_kwargs = {
            'id': {'validators': [UniqueValidator(queryset=Student.objects.all())]},
            'email': {'validators': [UniqueValidator(queryset=Student.objects.all())]},
        }


class StudentRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'email', 'image', 'password')

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop('password')
        student = Student.objects.create(
            **validated_data,
            password=make_password(password)  # Optional, for record-keeping
        )
        user, created = User.objects.get_or_create(
            username=student.email,
            defaults={'email': student.email, 'first_name': student.name}
        )
        if created:
            user.set_password(password)
            user.save()
        return student


class StudentProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('name', 'image')
