from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import JobApplicationViewSet, LoginView, RegisterView

router = DefaultRouter()
router.register('job-applications', JobApplicationViewSet, basename='job-application')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]
