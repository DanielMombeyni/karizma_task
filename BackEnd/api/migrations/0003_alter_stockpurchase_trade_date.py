# Generated by Django 5.0.3 on 2024-03-11 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockpurchase',
            name='trade_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
