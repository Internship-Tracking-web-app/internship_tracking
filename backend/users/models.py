from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
  
    class Roles(models.TextChoices):
        ADMIN = "ADMIN", _("Admin")
        STUDENT = "STUDENT", _("Student")
        SUPERVISOR = "SUPERVISOR", _("Supervisor")
        ADVISOR = "ADVISOR", _("Advisor")

    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.STUDENT,
        db_index=True
    )
    email = models.EmailField(_("email address"), unique=True)

    def is_student(self):
        return self.role == self.Roles.STUDENT

    def is_supervisor(self):
        return self.role == self.Roles.SUPERVISOR

    def is_advisor(self):
        return self.role == self.Roles.ADVISOR

    def is_admin_user(self):
        return self.role == self.Roles.ADMIN or self.is_superuser


class StudentProfile(models.Model):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="student_profile"
    )
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    id_number = models.CharField(max_length=100, unique=True)
    image = models.ImageField(blank=True, null=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.id_number})"
