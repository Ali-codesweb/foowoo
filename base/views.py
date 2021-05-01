from base.serializers import RestaurantSerializer, ServingSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import RestaurantProfile, Servings
from rest_framework.pagination import PageNumberPagination

# Create your views here.
@api_view(['GET'])
def restaurants_list(request):
    paginator = PageNumberPagination()
    paginator.page_size=2
    paginator.page_query_param = 'page'
    restaurants = RestaurantProfile.objects.all()
    context = paginator.paginate_queryset(restaurants,request)
    serializer = RestaurantSerializer(context,many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def servings_list(request):
    servings = Servings.objects.all()
    serializer = ServingSerializer(servings,many=True)
    return Response(serializer.data)
