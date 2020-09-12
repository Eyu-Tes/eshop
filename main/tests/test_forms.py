from django.core import mail
from django.test import TestCase

from main import forms

######################################################
# form test needs be both for valid and invalid data.
######################################################


class TestForm(TestCase):
    def test_valid_contact_form_sends_emil(self):
        form = forms.ContactForm(data={
            'name': 'Eyoab Tesfaye',
            'message': 'Hi there'
        })
        self.assertTrue(form.is_valid())

        with self.assertLogs('main.forms', level='INFO') as cm:
            form.send_contact_email()

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Site message')

    def test_invalid_contact_form(self):
        form = forms.ContactForm({
            'message': 'Hi there'
        })
        self.assertFalse(form.is_valid())
