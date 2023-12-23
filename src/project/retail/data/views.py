from django.shortcuts import render
from data.models import *
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .permissions import IsAdminOrReadOnly


class PersonalDataViewSet(viewsets.ModelViewSet):
    queryset = PersonalData.objects.all()
    serializer_class = PersonalDataSerializer

    # https://youtu.be/Ur24Ms-MD5k?si=pEnb5mv1g_YcBnvV&t=714
    # def get_queryset(self):
    #     pk = self.kwargs.get('pk')
    #     if not pk:
    #         return PersonalData.objects.all()[:3]
    #     return PersonalData.objects.filter(pk=pk)
    permission_classes = (IsAdminOrReadOnly, )


class CardsViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
    permission_classes = (IsAdminOrReadOnly, )


class ChecksViewSet(viewsets.ModelViewSet):
    queryset = Checks.objects.all()
    serializer_class = ChecksSerializer
    permission_classes = (IsAdminOrReadOnly, )


class GroupsSkuViewSet(viewsets.ModelViewSet):
    queryset = GroupsSku.objects.all()
    serializer_class = GroupsSkuSerializer
    permission_classes = (IsAdminOrReadOnly, )


class SKUViewSet(viewsets.ModelViewSet):
    queryset = Sku.objects.all()
    serializer_class = SKUSerializer
    permission_classes = (IsAdminOrReadOnly, )


class StoresViewSet(viewsets.ModelViewSet):
    queryset = Stores.objects.all()
    serializer_class = StoresSerializer
    permission_classes = (IsAdminOrReadOnly, )


class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    permission_classes = (IsAdminOrReadOnly, )

# class PersonalDataAPIList(generics.ListAPIView):
#     queryset = PersonalData.objects.all()
#     serializer_class = PersonalDataSerializer

# https://youtu.be/m7asgk5F0u8?si=Iur3wuesWYVFZpon&t=106
# class PersonalDataAPIUpdate(generics.UpdateAPIView):
#     queryset = PersonalData.objects.all()
#     serializer_class = PersonalDataSerializer


# class PersonalDataAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = PersonalData.objects.all()
#     serializer_class = PersonalDataSerializer


# class PersonalDataAPI(APIView):
#     def get(self, request):
#         data = PersonalData.objects.all()
#         return Response({'personal_data': PersonalDataSerializer(data, many=True).data})

#     def post(self, request):
#         serializer = PersonalDataSerializer(data =  request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'personal_data': serializer.data})

#     def put(self, request, *args, **kwargs):
#         Customer_ID = kwargs.get('customer_id', None)
#         print(Customer_ID)
#         if not Customer_ID:
#             return Response({"error": "Method PUT not allowed"})
#         try:
#             instance = PersonalData.objects.get(customer_id=Customer_ID)
#         except:
#             return Response({"error": "Object does not exist"})

#         serializer = PersonalDataSerializer(data=request.data, instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({"personal_data": serializer.data})

#     def delete(self, request, *args, **kwargs):
#         Customer_ID = kwargs.get('customer_id', None)
#         if not Customer_ID:
#             return Response({"error": "Method DELETE not allowed"})
#         #  delete
#         return Response({'personal_data': "deleted Customer_ID: " + str(Customer_ID)})


def data_main(request):
    return render(request, 'data_main.html')
