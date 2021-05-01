from django.contrib import admin
from django.urls import path
from base.user_views import views
urlpatterns = [
    path('register/',views.register_user,name='register-user'),
    path('login/',views.MyTokenObtainPairView.as_view(),name='login'),
    path('donate-or-request/',views.donate_or_request_serving,name='donate-or-request-serving'),
    path('update-details/',views.update_user_details,name='update_user_details'),
    path('my-donations-and-requests/',views.my_donations_and_requests,name='my_donations_and_requests'),
]
