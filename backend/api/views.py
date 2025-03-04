from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import ScoreEntry
from api.serializers import ScoreEntrySerializer

class ScoreEntryListCreate(generics.ListCreateAPIView):
    queryset = ScoreEntry.objects.all().order_by('-created_at')
    serializer_class = ScoreEntrySerializer



from rest_framework import status
from rest_framework.response import Response

class ScoreEntryDelete(generics.DestroyAPIView):
    queryset = ScoreEntry.objects.all()
    serializer_class = ScoreEntrySerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)