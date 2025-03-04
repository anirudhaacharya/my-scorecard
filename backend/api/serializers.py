from rest_framework import serializers
from .models import ScoreEntry

class ScoreEntrySerializer(serializers.ModelSerializer):
    total_score = serializers.FloatField(read_only=True)
    
    class Meta:
        model = ScoreEntry
        fields = '__all__'