from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views.generic import DetailView, FormView, ListView
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse_lazy

from .forms import ContactForm, SignUpForm, CartItemFormSet
from .models import Product, Category, Cart, CartItem


# Create your views here.
class ContactUsView(FormView):
    form_class = ContactForm
    # success_url = '/'
    success_url = reverse_lazy('product_list')
    template_name = 'main/contact.html'

    def form_valid(self, form):
        form.send_contact_email()
        return super().form_valid(form)

# NB:
# Using 'reverse' in CBV success_url raises an 'ImproperlyConfigured' Exception,
# So, use 'reverse_lazy' instead.


class ProductListView(ListView):
    # use 'products' as variable name instead of the default 'object_list'
    context_object_name = 'products'
    paginate_by = 5
    template_name = 'main/home.html'

    # override __init__ to add request parameter
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.category_query = None

    def dispatch(self, request, *args, **kwargs):
        # find query parameter called 'category' in url: i.e. '/?category='blabla'
        self.category_query = self.request.GET.get('category', None)
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        """ return a queryset of all in_stock products of a given category """
        # url_category = self.kwargs.get('category', None)
        # if url_category:
        #     category = get_object_or_404(Category, name=url_category)
        #     qs = Product.objects.in_stock().filter(category__name=category)
        # else:
        #     qs = Product.objects.in_stock()
        #
        # return qs
        if self.category_query:
            category = get_object_or_404(Category, name=self.category_query)
            qs = Product.objects.in_stock().filter(category__name=category)
        else:
            qs = Product.objects.in_stock()

        return qs

    def get_context_data(self, **kwargs):
        # context = super().get_context_data(**kwargs)
        # context['categories'] = Category.objects.all()
        # url_category = self.kwargs.get('category', None)
        # category = None
        # if url_category:
        #     category = get_object_or_404(Category, name=url_category)
        # context['category'] = category
        # return context
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        category = None
        if self.category_query:
            category = get_object_or_404(Category, name=self.category_query)
        context['category'] = category
        return context


class ProductDetailView(DetailView):
    model = Product
    template_name = 'main/product_detail.html'


class SignUpView(FormView):
    form_class = SignUpForm
    template_name = 'main/signup.html'

    def get_success_url(self):
        redirect_to = self.request.GET.get('next', '/')
        print('(((((((((((((((((((((((((((((')
        print(self.request.GET)
        return redirect_to

    def form_valid(self, form):
        form.save()
        email = form.cleaned_data.get('email')
        password = form.cleaned_data.get('password1')
        user = authenticate(email=email, password=password)
        login(self.request, user)
        form.send_welcome_email()
        # display “flash” message to user upon their browser’s next HTTP request
        messages.info(self.request, 'You signed up successfully.')
        return super().form_valid(form)


def add_to_cart(request):
    product = get_object_or_404(Product, pk=request.GET.get('product_id'))
    cart = request.cart
    if not request.cart:
        if request.user.is_authenticated:
            user = request.user
        else:
            user = None
        cart = Cart.objects.create(user=user)
        request.session['cart_id'] = cart.id

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart, product=product
    )
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return redirect('product', pk=product.id)


def cart(request):
    cart_obj = request.cart
    context = {
        'cart': cart_obj
    }
    return render(request, 'main/cart.html', context=context)


# django doesn't include CBVs coupled with formsets.
def manage_cart(request, pk):
    cart_item = get_object_or_404(CartItem, id=pk)
    action = request.GET.get('action', None)

    if action == 'inc':
        cart_item.quantity += 1
        cart_item.save()
    elif action == 'dcr':
        cart_item.quantity -= 1
        cart_item.save()
        if cart_item.quantity <= 0:
            cart_item.delete()
    elif action == 'rmv':
        cart_item.delete()

    return redirect('cart')
