from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path
from django.views.generic import TemplateView

from .forms import SignInForm
from .views import ContactUsView, ProductListView, ProductDetailView, SignUpView, \
    add_to_cart, cart, manage_cart

urlpatterns = [
    # path('', ProductListView.as_view(), name='product_list'),
    # path('<str:category>/products/', ProductListView.as_view(), name='product_list_by_category'),
    path('', ProductListView.as_view(), name='product_list'),
    path('about/', TemplateView.as_view(template_name="main/about.html"), name='about'),
    path('contact/', ContactUsView.as_view(), name='contact'),
    path('product/<int:pk>', ProductDetailView.as_view(), name='product'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', LoginView.as_view(
        form_class=SignInForm,
        template_name='main/signin.html',
    ), name='signin'),
    path('signout/', LogoutView.as_view(next_page='product_list'), name='signout'),
    path('add_to_cart/', add_to_cart, name='add_to_cart'),
    path('cart/', cart, name='cart'),
    path('cart/<int:pk>/manage/', manage_cart, name='manage_cart')
]
