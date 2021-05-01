from base.models import CustomUser, RestaurantProfile, Servings, UserProfile,DonationRequest
from django.contrib import admin

# Register your models here.
admin.site.register(RestaurantProfile)
admin.site.register(CustomUser)
admin.site.register(UserProfile)
admin.site.register(Servings)
admin.site.register(DonationRequest)