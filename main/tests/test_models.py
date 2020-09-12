from decimal import Decimal

from django.test import TestCase

from main import models


class TestModel(TestCase):
    # make sure that the active manager works by only filtering active products
    def test_active_manager_works(self):
        models.Product.objects.create(
            name='Atomic Habits',
            price=Decimal('20.95')
        )
        models.Product.objects.create(
            name="Pride and Prejudice",
            price=Decimal("2.00")
        )
        models.Product.objects.create(
            name="A Tale of Two Cities",
            price=Decimal("2.00"),
            active=False
        )

        self.assertEqual(len(models.Product.objects.active()), 2)
