from io import BytesIO
import logging
from PIL import Image

from django.core.files.base import ContentFile
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import ProductImage


THUMBNAIL_SIZE = (300, 300)

logger = logging.getLogger(__name__)


# pre_save : a signal that is fired before an object is saved
# sender: sends the signal (eg. ProductImage)
# receiver: a function that gets the signal and performs some task
################################################################################
# Whenever before saving a ProductImage instance, send a pre_save signal
# that be received by the generate_thumbnail receiver function
# which takes (sender, instance, **kwargs) arguments from the pre_save signal
# to use the image and create a thumbnail.
################################################################################

@receiver(pre_save, sender=ProductImage)
def generate_thumbnail(sender, instance, **kwargs):
    logger.info(f'Generating thumbnail for product {instance.product.id}')

    image = Image.open(instance.image)
    image = image.convert('RGB')
    image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

    temp_thumb = BytesIO()
    image.save(temp_thumb, "JPEG")
    temp_thumb.seek(0)

    # set save=False, otherwise it will run in an infinite loop
    instance.thumbnail.save(
        instance.image.name,
        ContentFile(temp_thumb.read()),
        save=False
    )

    temp_thumb.close()
