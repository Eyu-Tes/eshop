import logging

from django import forms
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import send_mail

from .models import CustomUser

logger = logging.getLogger(__name__)


class ContactForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100, widget=forms.TextInput)
    message = forms.CharField(max_length=200, widget=forms.Textarea)

    # run custom validation on the name field
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if name == 'eyu':
            self._errors['name'] = ["You can't use this name."]
        return name

    def send_contact_email(self):
        logger.info("Sending email to customer service")
        subject = 'Site message'
        message = f"From: {self.cleaned_data.get('name')}\n{self.cleaned_data.get('message')}"
        sender_email = "eu_email@gmail.com"
        receiver_emails = ["eu_receiver1_email@gmail.com", "eu_receiver2_email@gmail.com"]

        send_mail(subject, message, sender_email, receiver_emails, fail_silently=False)


class SignUpForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password1', 'password2']

        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control form-control-sm'}),
            'email': forms.EmailInput(attrs={'class': 'form-control form-control-sm'}),
        }

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['password1'] = forms.CharField(widget=forms.PasswordInput(attrs={
            'class': 'form-control form-control-sm'}), label='Password')
        self.fields['password2'] = forms.CharField(widget=forms.PasswordInput(attrs={
            'class': 'form-control form-control-sm'}), label='Confirm password')
        # Remove autofocus attribute from email field
        self.fields['email'].widget.attrs.pop("autofocus", None)

    def send_welcome_email(self):
        logger.info(f"Sending signup email for {self.cleaned_data.get('email')}")

        subject = 'Welcome to BookTime'
        message = f'Welcome {self.cleaned_data.get("email")}'
        sender = 'eutesfaye10@gmail.com'
        receivers = [self.cleaned_data.get('email')]

        send_mail(subject, message, sender, receivers, fail_silently=False)


class SignInForm(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(attrs={
        'class': 'form-control form-control-sm'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control form-control-sm'}))

    # override the __init__() method to accept the request object
    # request object is required by the authenticate method
    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user = None
        super().__init__(*args, **kwargs)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        if email and password:
            self.user = authenticate(self.request, email=email, password=password)
        if not self.user:
            messages.error(self.request, "Invalid email or password.")
            raise forms.ValidationError("Invalid email or password.")

        return self.cleaned_data

    # return user
    # Otherwise: AttributeError at /signin/ 'SignInForm' object has no attribute 'get_user'
    def get_user(self):
        return self.user

