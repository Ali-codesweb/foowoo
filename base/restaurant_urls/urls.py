from django.contrib import admin
from django.urls import path
from base.restaurant_views import views
urlpatterns = [
    path('restaurant-servings/<pk>/',
         views.restaurant_servings, name='restaurant-servings'),
    path('restaurant-profile/update/',
         views.restaurant_profile, name='restaurant-profile'),
    path('restaurant-details/', views.restaurant_details,
         name='restaurant-details'),
    path('restaurant-password/update/', views.restaurant_pass_reset,
         name='restaurant-password-update'),
    path('my-servings/', views.my_servings, name='my-servings'),
    path('my-servings/update/', views.edit_my_serving, name='edit-my-servings'),
    path('delete-serving/<pk>/', views.delete_serving, name='delete_serving'),
    path('donation-or-request-requests/', views.donation_or_request_requests, name='donation__or_request_requests'),
    path('accept-decline-donation-requests/',
         views.accept_decline_donation, name='accept_decline_donation'),
    path('donators-list/',
         views.donators_list, name='donators_list'),
    path('create-serving/',
         views.create_serving, name='create_serving'),

]
