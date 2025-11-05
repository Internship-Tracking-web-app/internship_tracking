from django.contrib.auth import get_user_model, authenticate
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student
from .serializers import (
    StudentSerializer,
    StudentRegisterSerializer,
    StudentProfileUpdateSerializer,
)

User = get_user_model()


class StudentRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = StudentRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()
        return Response(StudentSerializer(student).data, status=status.HTTP_201_CREATED)


class StudentLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        if not user:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        try:
            student = Student.objects.get(email=user.username)
        except Student.DoesNotExist:
            student = None

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'student': StudentSerializer(student).data if student else None
        }, status=status.HTTP_200_OK)


class StudentProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def _get_student(self, user: User):
        from django.shortcuts import get_object_or_404
        return get_object_or_404(Student, email=user.username)

    def get(self, request):
        student = self._get_student(request.user)
        return Response(StudentSerializer(student).data, status=status.HTTP_200_OK)

    def put(self, request):
        return self._update(request, partial=False)

    def patch(self, request):
        return self._update(request, partial=True)

    def _update(self, request, partial: bool):
        student = self._get_student(request.user)
        serializer = StudentProfileUpdateSerializer(student, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(StudentSerializer(student).data, status=status.HTTP_200_OK)
