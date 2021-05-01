from base.serializers import UserSerializerToken, UserSerializerWithToken, DonationRequestSerializer
from base.models import CustomUser, RestaurantProfile, Servings, DonationRequest, UserProfile
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = CustomUser.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            is_user=True,
            is_restaurant=False
        )
    except:
        message = {'message': 'This user already exists'}
        return Response(message, status=status.HTTP_403_FORBIDDEN)
    serializer = UserSerializerToken(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def donate_or_request_serving(request):
    data = request.data
    user = UserProfile.objects.get(user=request.user)
    restaurant = RestaurantProfile.objects.get(id=data['restaurant_id'])
    serving = Servings.objects.get(id=data['serving_id'])
    quantity = data['quantity']
    request_type = data['type']
    donation_request = DonationRequest.objects.create(
        user=user,
        restaurant=restaurant,
        serving=serving,
        quantity=quantity,
        request_type=request_type
    )
    serializer = DonationRequestSerializer(donation_request)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_details(request):
    user = request.user
    data = request.data
    if data['username'] != '':
        user.username = data['username']
    if data['firstName'] != '':
        user.first_name = data['firstName']
    if data['lastName'] != '':
        user.last_name = data['lastName']
    user.save()
    serializer = UserSerializerWithToken(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_donations_and_requests(request):
    if request.user.is_user == True:
        user = request.user
        httpdata = request.get_full_path()
        request_type = httpdata.split('?type=')[1]
        donations = DonationRequest.objects.filter(
            user__user=user.id,
            request_type=request_type,
            is_accepted=True
        )
        serialized_data =[]
        for i in donations:
            dict = {}
            dict['restaurant'] = str(i.restaurant)
            dict['serving'] = str(i.serving)
            dict['quantity'] = i.quantity
            serialized_data.append(dict)
        return Response(serialized_data)
    else:
        return Response({'message': 'You are not Authenticated to view this page'})
