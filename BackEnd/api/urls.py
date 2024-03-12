from django.urls import path, include  # type:ignore
from rest_framework.routers import DefaultRouter, SimpleRouter  # type:ignore
from .views import (
    StockPurchaseListCreate,
    PortfolioList,
    DeleteStockApiView,
    StockDetailView,
)
from user.views import LoginViewSet, RegistrationViewSet, RefreshViewSet, UpdateUserView

router = DefaultRouter()

routes = SimpleRouter()
routes.register(r"auth/login", LoginViewSet, basename="auth-login")
routes.register(r"auth/register", RegistrationViewSet, basename="auth-register")
routes.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")

urlpatterns = [
    *routes.urls,
    path("stock-purchases/", StockPurchaseListCreate.as_view(), name="stock-purchases"),
    path("portfolio/", PortfolioList.as_view(), name="portfolio"),
    path("user/update/", UpdateUserView.as_view(), name="update_user"),
    path("stock/<int:pk>/update/", StockDetailView.as_view(), name="stock-detail"),
    path("stock/<int:pk>/delete/", DeleteStockApiView.as_view(), name="delete_stock"),
]
