from django.views.generic import FormView
from django.shortcuts import render
from django.urls import reverse_lazy

from .forms import ContactForm


# Create your views here.
class ContactUsView(FormView):
    form_class = ContactForm
    # success_url = '/'
    success_url = reverse_lazy('home')
    template_name = 'main/contact.html'

    def form_valid(self, form):
        form.send_contact_email()
        return super().form_valid(form)

# NB:
# Using 'reverse' in CBV success_url raises an 'ImproperlyConfigured' Exception,
# So, use 'reverse_lazy' instead.
