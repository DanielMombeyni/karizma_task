from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from rest_framework_simplejwt import views as jwt_views  # type: ignore

urlpatterns = [
    path("admin/", admin.site.urls),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("api.urls")),
]
