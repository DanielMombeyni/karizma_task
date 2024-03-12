from rest_framework import serializers  # type:ignore
from .models import StockPurchase, Portfolio


class StockPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPurchase
        fields = "__all__"


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"
