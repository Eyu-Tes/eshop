# Generated by Django 3.1.1 on 2020-09-17 19:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20200915_1651'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cartitem',
            options={'ordering': ['id']},
        ),
    ]
