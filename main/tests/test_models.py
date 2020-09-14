from decimal import Decimal

from django.test import TestCase

from main import models


class TestModel(TestCase):
    # make sure that the active manager works by only filtering active products
    def test_in_stock_manager_works(self):
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
