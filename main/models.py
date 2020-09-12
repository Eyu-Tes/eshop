from django.db import models


# managers
class ActiveManager(models.Manager):
    # So we can use: Product.objects.active() to return only active products
    def active(self):
        return self.filter(active=True)


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)
    # Use DecimalField instead of FloatField to avoid rounding issues
    # DecimalField must define max_digits & decimal_places
    price = models.DecimalField(max_digits=6, decimal_places=2)
    slug = models.SlugField(max_length=48)
    active = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    data_updated = models.DateTimeField(auto_now=True)

    # custom manager
    objects = ActiveManager()


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product-images')
    thumbnail = models.ImageField(upload_to='product-thumbnails', null=True)


class ProductTag(models.Model):
    products = models.ManyToManyField(Product, blank=True)
    name = models.CharField(max_length=32)
    slug = models.CharField(max_length=48)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    