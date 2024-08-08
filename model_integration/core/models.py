from django.db import models

# Create your models here.


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True
        
class Conversation(BaseModel):
    model = models.CharField(max_length=50)
    prompt = models.TextField()
    response = models.TextField()
