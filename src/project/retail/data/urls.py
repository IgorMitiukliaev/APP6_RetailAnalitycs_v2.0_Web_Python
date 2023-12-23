from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'personaldata', PersonalDataViewSet, basename='personaldata')
router.register(r'cards', CardsViewSet)
router.register(r'checks', ChecksViewSet)
router.register(r'groupssku', GroupsSkuViewSet)
router.register(r'sku', SKUViewSet)
router.register(r'stores', StoresViewSet)
router.register(r'transactions', TransactionsViewSet)

urlpatterns = [
    # path('', data_main, name='data_main'),
    # router set
    # http://127.0.0.1:8000/data/api
    # http://127.0.0.1:8000/data/api/personaldata
    # http://127.0.0.1:8000/data/api/personaldata/5/
    path('', include(router.urls)),
    # @action decorator
    # https://youtu.be/Ur24Ms-MD5k?si=YGIOZqO3dSHD2iYg&t=407

]
