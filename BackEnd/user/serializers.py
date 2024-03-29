from rest_framework import serializers  # type: ignore
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login  # type: ignore
from django.core.exceptions import ObjectDoesNotExist  # type: ignore
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_active", "created", "updated"]
        read_only_field = ["is_active", "created", "updated"]


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)  # type: ignore

        refresh = self.get_token(self.user)  # type: ignore

        data["user"] = UserSerializer(self.user).data  # type: ignore
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)  # type: ignore

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)  # type: ignore

        return data


class RegisterSerializer(UserSerializer):
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "phone",
            "username",
            "email",
            "password",
            "is_active",
            "created",
            "updated",
        ]

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)  # type: ignore
        return user


