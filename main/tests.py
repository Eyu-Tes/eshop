from django.test import TestCase
from django.urls import reverse


# Create your tests here.

# ***** Start the name of test case methods with the word "test" *****
##################################################################################################
# When you run your tests, the default behavior of the test utility is to find all the test cases
# (that is, subclasses of unittest.TestCase) in any file whose name begins with test
##################################################################################################

class TestPage(TestCase):
    def test_homepage_works(self):
        # response = self.client.get('/')
        response = self.client.get(reverse('home'))
        # make sure the HTTP status code for this page is 200
        self.assertEqual(response.status_code, 200)
        # make sure the template 'main/home.html' has been used
        self.assertTemplateUsed(response, 'main/home.html')
        # make sure the response contains the name of the shop: "BookTime"
        self.assertContains(response, 'BookTime')

    def test_about_page_works(self):
        # NB: Don't forget to add a leading '/' before the path of the URL
        # response = self.client.get('/about/')
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/about.html')
        self.assertContains(response, 'BookTime')
