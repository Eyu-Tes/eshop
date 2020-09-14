from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.http import Http404
from django.views.generic import DetailView, FormView, ListView
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy

from .forms import ContactForm, SignUpForm
from .models import Product, Category


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
    extra_context = {
        'categories': Category.objects.all()
    }
    paginate_by = 6
    template_name = 'main/home.html'

    def get_queryset(self):
        """ return a queryset of all in_stock products of a given category """
        url_category = self.kwargs.get('category', None)
        if url_category:
            category = get_object_or_404(Category, name=url_category)
            qs = Product.objects.in_stock().filter(category__name=category)
        else:
            qs = Product.objects.in_stock()

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        url_category = self.kwargs.get('category', None)
        category = None
        if url_category:
            category = get_object_or_404(Category, name=url_category)
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
