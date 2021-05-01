from django.contrib import admin
from django.urls import path, include
from base.views import restaurants_list, servings_list
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/user/', include('base.user_urls.urls')),
    path('api/restaurant/', include('base.restaurant_urls.urls')),
    path('api/', restaurants_list, name='restaurants'),
    path('api/servings/', servings_list, name='servings'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
