from decimal import Decimal

from django.test import TestCase
from django.urls import reverse

from main import forms, models


# Create your tests here.

# ***** Start the name of test case methods with the word "test" *****
##################################################################################################
# When you run your tests, the default behavior of the test utility is to find all the test cases
# (that is, subclasses of unittest.TestCase) in any file whose name begins with test
##################################################################################################

class TestPage(TestCase):
    def test_product_list_page_works(self):
        # response = self.client.get('/')
        response = self.client.get(reverse('product_list'))
        # make sure the HTTP status code for this page is 200
        self.assertEqual(response.status_code, 200)
        # make sure the template 'main/home.html' has been used
        self.assertTemplateUsed(response, 'main/home.html')
        # make sure the response contains the name of the shop: "BookTime"
        self.assertContains(response, 'BookTime')

    def test_product_list_by_category_page_works(self):
        category = models.Category.objects.create(
            name='Cat'
        )
        response = self.client.get(reverse('product_list_by_category', kwargs={'category': category}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/home.html')
        self.assertContains(response, 'BookTime')

    def test_product_page_returns_in_stock(self):
        category = models.Category.objects.create(
            name='Book'
        )
        models.Product.objects.create(
            name='Atomic Habits',
            category=category,
            price=Decimal('20.95')
        )
        models.Product.objects.create(
            name="Pride and Prejudice",
            category=category,
            price=Decimal("2.00")
        )
        models.Product.objects.create(
            name="A Tale of Two Cities",
            category=category,
            price=Decimal("2.00"),
            in_stock=False
        )

        response = self.client.get(reverse('product_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "BookTime")
        product_list = models.Product.objects.in_stock().order_by("name")
        self.assertEqual(list(response.context["object_list"]), list(product_list),)

    def test_about_page_works(self):
        # NB: Don't forget to add a leading '/' before the path of the URL
        # response = self.client.get('/about/')
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/about.html')
        self.assertContains(response, 'BookTime')

    def test_contact_page_works(self):
        response = self.client.get('/contact/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/contact.html')
        self.assertContains(response, 'BookTime')
        self.assertIsInstance(response.context['form'], forms.ContactForm)
