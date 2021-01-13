from .models import Cart


# This automatically connects carts to HTTP requests.
# We are doing it in a middleware because we are going to use carts in several views and templates.
# It helps us avoid repeating identical calls to a particular piece of code
def cart_middleware(get_response):
    def middleware(request):
        if 'cart_id' in request.session:
            cart_id = request.session.get('cart_id')
            cart = Cart.objects.get(id=cart_id)
            request.cart = cart
        else:
            request.cart = None

        response = get_response(request)

        # now we can use request.cart in views or {{request.cart}} in template
        return response
    return middleware
