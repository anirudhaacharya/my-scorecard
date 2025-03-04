# scorecard/models.py
from django.db import models

class ScoreEntry(models.Model):
    score_name = models.CharField(max_length=200)
    productivity = models.FloatField()
    quality = models.FloatField()
    timeliness = models.FloatField()
    prod_weight = models.FloatField(default=0.4)
    qual_weight = models.FloatField(default=0.35)
    time_weight = models.FloatField(default=0.25)
    created_at = models.DateTimeField(auto_now_add=True)
    
    @property
    def total_score(self):
        return (
            self.productivity * self.prod_weight +
            self.quality * self.qual_weight +
            self.timeliness * self.time_weight
        )
    
    def __str__(self):
        return f"ScoreEntry ({self.created_at.strftime('%Y-%m-%d')})"
    
    
    # def clean(self):
    #     total_weight = self.prod_weight + self.qual_weight + self.time_weight
    #     if not (0.999 < total_weight < 1.001):
    #         raise Exception("Weights must sum to 100%")
