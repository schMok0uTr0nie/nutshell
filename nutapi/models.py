from django.db import models
from django.utils import timezone


class Nut(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title
