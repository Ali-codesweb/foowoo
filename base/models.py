from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
# Create your models here.


class CustomUser(AbstractUser):
    is_user = models.BooleanField(default=True)
    is_restaurant = models.BooleanField(default=False)


class UserProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.user)


class RestaurantProfile(models.Model):
    restaurant = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    pincode = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return str(self.restaurant)


class Servings(models.Model):
    restaurant = models.ForeignKey(
        RestaurantProfile, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)
    ingredients = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    quantity = models.IntegerField(default=0)
    is_vegan = models.BooleanField(default=False)

    def __str__(self):
        return str(self.name)


class DonationRequest(models.Model):

    request_type_choices = (
        ("Donation", "Donation"),
        ("Request", "Request"),
    )

    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    serving = models.ForeignKey(
        Servings, on_delete=models.CASCADE, null=True, blank=True)
    restaurant = models.ForeignKey(
        RestaurantProfile, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=1)
    request_type = models.CharField(
        default='Donation', choices=request_type_choices,max_length=25)
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


def restaurant_profile(sender, instance, created, **kwargs):
    if created and instance.is_restaurant == True:
        RestaurantProfile.objects.create(restaurant=instance, name=instance)
    if created and instance.is_user == True:
        UserProfile.objects.create(user=instance)


post_save.connect(restaurant_profile, sender=CustomUser)
