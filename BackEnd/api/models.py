from django.db import models  # type: ignore
from user.models import User  # type: ignore
from django.core.cache import cache  # type: ignore


class StockPurchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trade_date = models.DateField(auto_now_add=True)
    stock_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRADE_TYPES = (
        ("BUY", "Buy"),
        ("SELL", "Sell"),
    )
    trade_type = models.CharField(max_length=4, choices=TRADE_TYPES)

    def save(self, *args, **kwargs):
        if self.amount is None:
            if self.trade_type == "BUY":
                self.amount = self.stock_price * self.quantity
            elif self.trade_type == "SELL":
                self.amount = -(self.stock_price * self.quantity)
        super().save(*args, **kwargs)

    @classmethod
    def get_latest_trades(cls, user_id, num_trades=10):
        cache_key = f"latest_trades_user_{user_id}_{num_trades}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return cached_data

        latest_trades = cls.objects.filter(user_id=user_id).order_by("-trade_date")[
            :num_trades
        ]
        cache.set(cache_key, latest_trades)
        return latest_trades

    class Meta:
        indexes = [
            models.Index(fields=["user", "trade_date"]),
            models.Index(fields=["stock"]),  # Index for stock field
        ]


class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    quantity = models.PositiveIntegerField()
    total_investment = models.DecimalField(max_digits=10, decimal_places=2)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["symbol"]),
        ]

    @classmethod
    def get_user_portfolio(cls, user_id):
        cache_key = f"user_portfolio_{user_id}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return cached_data

        user_portfolio = cls.objects.filter(user_id=user_id)
        cache.set(cache_key, user_portfolio)
        return user_portfolio
