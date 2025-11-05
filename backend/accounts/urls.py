from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import  StudentRegisterView, StudentLoginView, StudentProfileView




urlpatterns = [
	path('students/register/', StudentRegisterView.as_view(), name='student_register'),
	path('students/login/', StudentLoginView.as_view(), name='student_login'),
	path('students/profile/', StudentProfileView.as_view(), name='student_profile'),
]


