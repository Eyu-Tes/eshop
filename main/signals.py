from io import BytesIO
import logging
from PIL import Image

from django.contrib.auth.signals import user_logged_in
from django.core.files.base import ContentFile
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import ProductImage, Cart


THUMBNAIL_SIZE = (300, 300)

logger = logging.getLogger(__name__)


# pre_save : a built-in signal that is fired before an object is saved
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


@receiver(user_logged_in)
def manage_cart(sender, user, request, **kwargs):
    # when the user logs in,
    # if there is an anonymous cart:
    #   if previous cart assigned to the current user (loggedin cart) found,
    #       merge the anonymous cart with the loggedin cart & then delete the anonymous cart
    #       if anonymous cart and loggedin cart have the same item:
    #           increment the loggein cart item quantity by the quantity in the anonymous cart item &
    #           then delete the anonymous cart item
    #   else, assign the anonymous cart to the current user (create a new loggedin cart)
    #   Result: make cart no longer anonymous
    # else (if no anonymous cart):
    #   if previous cart assigned to the current user found, get it
    #   else, do nothing

    ####################################################################################
    # Key terms: anonymous cart, loggedin cart, anonymous cart item, loggedin cart item
    ####################################################################################

    # equivalent to request.cart
    anonymous_cart = getattr(request, 'cart', None)
    if anonymous_cart:
        try:
            loggedin_cart = Cart.objects.get(user=user, status=Cart.Statuses.OPEN)
            for item in anonymous_cart.cartitem_set.all():
                for loggedin_item in loggedin_cart.cartitem_set.all():
                    if item.product_id == loggedin_item.product_id:
                        loggedin_item.quantity += item.quantity
                        loggedin_item.save()
                        item.delete()
                        break
                # Python for/else (if no break in the for loop, this code is executed)
                else:
                    item.cart = loggedin_cart
                    item.save()
            anonymous_cart.delete()
            request.session['cart_id'] = loggedin_cart.id
        except Cart.DoesNotExist:
            anonymous_cart.user = user
            anonymous_cart.save()
    else:
        try:
            loggedin_cart = Cart.objects.get(user=user, status=Cart.Statuses.OPEN)
            request.session['cart_id'] = loggedin_cart.id
        except Cart.DoesNotExist:
            pass
