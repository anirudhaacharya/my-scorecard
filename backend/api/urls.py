from django.urls import path
from api.views import ScoreEntryListCreate
from .views import ScoreEntryListCreate, ScoreEntryDelete
urlpatterns = [
    path('entries/', ScoreEntryListCreate.as_view(), name='score-entry-list-create'),
        path('entries/<int:pk>/', ScoreEntryDelete.as_view(), name='score-entry-delete'),
]
