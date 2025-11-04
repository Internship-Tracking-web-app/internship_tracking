from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, StudentProfile

@receiver(post_save, sender=User)
def create_student_profile(sender, instance, created, **kwargs):
    if created and instance.role == User.Roles.STUDENT:
        StudentProfile.objects.create(user=instance, full_name=f"{instance.first_name} {instance.last_name}".strip())

@receiver(post_save, sender=User)
def save_student_profile(sender, instance, **kwargs):
    if instance.role == User.Roles.STUDENT:
        StudentProfile.objects.get_or_create(user=instance)
