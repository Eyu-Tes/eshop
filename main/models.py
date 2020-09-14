from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


# Create your models here.   

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product_list_by_category', kwargs={'category': self.name})


class Tag(models.Model):
    # products = models.ManyToManyField(Product, blank=True, null=True)
    name = models.CharField(max_length=32)
    slug = models.CharField(max_length=48)
    description = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# managers
class InStockManager(models.Manager):
    # So we can use: Product.objects.in_stock() to return only products in stock
    def in_stock(self):
        return self.filter(in_stock=True)


class Product(models.Model):
    name = models.CharField(max_length=32)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    # Use DecimalField instead of FloatField to avoid rounding issues
    # DecimalField must define max_digits & decimal_places
    price = models.DecimalField(max_digits=6, decimal_places=2)
    slug = models.SlugField(max_length=48)
    # Don't use null=True
    # Otherwise: Warning - null has no effect on ManyToManyField.
    tags = models.ManyToManyField(Tag, blank=True)
    in_stock = models.BooleanField(default=True)
    date_updated = models.DateTimeField(auto_now=True)

    # custom manager
    objects = InStockManager()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product', kwargs={'pk': self.id})

    # return all images associated with the given product object
    @property
    def images(self):
        return self.productimage_set.all()

    # return all tags associated with the given product object
    @property
    def product_tags(self):
        return self.tags.values_list('name', flat=True)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product-images')
    thumbnail = models.ImageField(upload_to='product-thumbnails', null=True)


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('Users must have an email address'))
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Create and save a SuperUser with the given email and password.
        """
        user = self.create_user(email, password=password,)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

