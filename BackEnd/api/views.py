from rest_framework import (  # type:ignore
    generics,
    permissions,
    viewsets,
    views,
    response,
    status,
)  # type:ignore
from .models import StockPurchase, Portfolio
from .serializers import StockPurchaseSerializer, PortfolioSerializer


class StockPurchaseListCreate(generics.ListCreateAPIView):
    queryset = StockPurchase.objects.all()
    serializer_class = StockPurchaseSerializer


class StockDetailApi(views.APIView):
    def put(self, request, pk):
        try:
            stock = StockPurchase.objects.get(pk=pk)
        except stock.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        serializer = StockPurchaseSerializer(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StockDetailView(generics.RetrieveUpdateAPIView):
    queryset = StockPurchase.objects.all()
    serializer_class = StockPurchaseSerializer


class DeleteStockApiView(generics.DestroyAPIView):
    queryset = StockPurchase.objects.all()
    serializer_class = StockPurchaseSerializer

    def destroy(self, request, *args, **kwargs):

        instance = self.get_object()

        self.perform_destroy(instance)

        return response.Response(status=status.HTTP_204_NO_CONTENT)


class PortfolioList(generics.ListAPIView):
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        user = self.request.user
        return Portfolio.objects.filter(user=user)
