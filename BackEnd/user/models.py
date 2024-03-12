from django.db import models  # type: ignore
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin  # type: ignore
from django.contrib.auth.base_user import BaseUserManager  # type: ignore


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, phone, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if phone is None:
            raise TypeError("Phone must have a phone.")
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise TypeError("Users must have an email.")

        user = self.model(
            phone=phone, username=username, email=self.normalize_email(email)
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, phone, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if phone is None:
            raise TypeError("Superusers must have a phone.")
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(phone, username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(
        db_index=True,
        verbose_name="email address",
        unique=True,
        null=True,
        blank=True,
        default="None",
    )
    phone = models.CharField(
        db_index=True, max_length=10, verbose_name="Phone number without 0", unique=True
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS: list = ["username", "email"]
    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    class Meta:
        db_table = "CustomUser"
        app_label = "user"
        managed = True
        verbose_name = "User"
        verbose_name_plural = "Users"
