from base.models import (CustomUser, DonationRequest, RestaurantProfile,
                         Servings)
from base.serializers import (DonationRequestSerializer, RestaurantSerializer,
                              ServingSerializer)
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import os

@api_view(['GET'])
def restaurant_servings(request, pk):
    data = request.data
    restaurant = RestaurantProfile.objects.get(id=pk)
    restaurant_servings = Servings.objects.filter(restaurant=restaurant)
    serializer = ServingSerializer(restaurant_servings, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def restaurant_profile(request):
    data = request.data
    user = request.user
    print(user)
    restaurant_profile = RestaurantProfile.objects.get(restaurant=user)
    print(request.data)
    if data['username'] != '':
        user.username = data['username']
    if data['restaurant_name'] != '':
        restaurant_profile.name = data['restaurant_name']
    if data['country'] != '':
        restaurant_profile.country = data['country']
    if data['state'] != '':
        restaurant_profile.state = data['state']
    if data['address'] != '':
        restaurant_profile.address = data['address']
    if data['city'] != '':
        restaurant_profile.city = data['city']

    restaurant_profile.save()
    print(restaurant_profile.city)
    serializer = RestaurantSerializer(restaurant_profile)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restaurant_details(request):
    user = request.user
    details = RestaurantProfile.objects.get(restaurant=user)
    serializer = RestaurantSerializer(details)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def restaurant_pass_reset(request):
    user = request.user
    data = request.data
    currrent_pass = data['current_password']
    new_pass = data['new_password']

    pass_check = user.check_password(currrent_pass)
    if pass_check:
        user.set_password(new_pass)
        user.save()
        return Response({'message': 'Your password has been changed successfully'})
    return Response({'messgae':
                     'You have entered the wrong current password, please enter the correct current password'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_servings(request):
    user = request.user
    servings = Servings.objects.filter(restaurant__name=str(user))
    serializer = ServingSerializer(servings, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_my_serving(request):
    user = request.user
    data = request.data
    try:
        serving = Servings.objects.get(
            id=data['serving_id'], restaurant__name=str(user))
    except:
        return Response({'message': 'Sorry cant find your restaurant'})

    serving.name = data['name']
    serving.description = data['description']
    serving.ingredients = data['ingredients']
    serving.quantity = data['quantity']
    serving.is_vegan = data['is_vegan']
    serving.save()

    serializer = ServingSerializer(serving)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_serving(request, pk):
    user = request.user
    serving = Servings.objects.get(id=pk, restaurant__name=str(user))
    serving.delete()
    return Response({'message': 'Deleted Successfully'})


# provides a list
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def donation_or_request_requests(request):
    user = request.user
    httpdata = request.get_full_path()
    request_type = httpdata.split('?type=')[1]

    data = []
    if user.is_user:
        return Response({'message': 'You are not authorised to view this page'})
    donation_requests = DonationRequest.objects.filter(
        restaurant__name=str(user), request_type=request_type)
    for i in donation_requests:
        dict = {}
        username = i.user.user.username
        quantity = i.quantity
        serving = i.serving
        id = i.id
        if i.is_accepted == False:
            dict['username'] = username
            dict['quantity'] = quantity
            dict['serving'] = serving.name
            dict['image'] = f'http://127.0.0.1:8000/images/{str(serving.image)}'
            dict['id'] = id
            dict['serving_id'] = serving.id
            data.append(dict)
        else:
            pass
    return Response(data)

# accept of decline requests or donatons


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_decline_donation(request):
    user = request.user
    data = request.data
    donation_request = DonationRequest.objects.get(id=data['id'])
    httpdata = request.get_full_path()
    request_type = httpdata.split('?type=')[1]
    serving = Servings.objects.get(
        id=data['serving_id'], restaurant__name=str(user))
    if request.user.is_user == False:
        if request_type == 'Request':
            if data['message'] == 'accept':
                donation_request.is_accepted = True
                donation_request.save()
                if serving.quantity <= 0:
                    return Response({'message': 'No servings to donate'})
                else:
                    serving.quantity -= int(data['quantity'])
                    serving.save()
                return Response({'message': 'Request Accepted'})
            elif data['message'] == 'decline':
                donation_request.delete()
                return Response({'message': 'Request Declined'})

        elif request_type == 'Donation':
            if data['message'] == 'accept':
                donation_request.is_accepted = True
                donation_request.save()
                serving.quantity += int(data['quantity'])
                serving.save()
                return Response({'message': 'Donation Accepted'})
            elif data['message'] == 'decline':
                donation_request.delete()
                return Response({'message': 'Donation Declined'})
    else:
        return Response({'message': 'You are unAuthorised to view this page'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def donators_list(request):
    user = request.user
    all_donations = DonationRequest.objects.filter(
        restaurant__name=str(user), is_accepted=True, request_type='Donation')
    data = []
    for i in all_donations:
        print(i.user.user.username)
        dict = {}
        dict['username'] = i.user.user.username
        dict['quantity'] = i.quantity
        data.append(dict)

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_serving(request):
    data = request.data
    user = request.user
    restaurant_profile = RestaurantProfile.objects.get(
        restaurant__username=str(user))

    serving = Servings.objects.create(
        restaurant=restaurant_profile,
        name=data['name'],
        description=data['description'],
        ingredients=data['ingredients'],
        image=data['image'],
        quantity=data['quantity'],
        is_vegan=data['is_vegan']
    )
    return Response({'message': 'you have successfully created a new serving'})
    # restaurant_profile
    # serving
os.path.dirname('')