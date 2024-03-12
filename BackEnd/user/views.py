from rest_framework.response import Response  # type:ignore
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.viewsets import ModelViewSet, ViewSet  # type:ignore
from rest_framework.permissions import AllowAny  # type:ignore
from rest_framework import status, generics  # type:ignore
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer  # type:ignore
    permission_classes = (AllowAny,)  # type:ignore
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer  # type:ignore
    permission_classes = (AllowAny,)  # type:ignore
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),  # type:ignore
        }

        return Response(
            {
                "user": serializer.data,
                "refresh": res["refresh"],
                "token": res["access"],
            },
            status=status.HTTP_201_CREATED,
        )


#
class RefreshViewSet(ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)  # type: ignore
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class UpdateUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
