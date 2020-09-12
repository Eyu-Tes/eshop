import logging

from django import forms
from django.core.mail import send_mail

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
