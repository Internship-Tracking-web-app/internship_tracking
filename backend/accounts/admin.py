from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import User,Student


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
	pass


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'email')
	search_fields = ('id', 'name', 'email')


