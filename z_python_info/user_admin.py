"""
admin.py file in account app

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account

# Register your models here.
admin.site.register(Account, UserAdmin)




1. Import Statements:
--------------------

    => from django.contrib import admin: This imports the admin module from Django, which provides functionalities for building administrative interfaces.

    => from django.contrib.auth.admin import UserAdmin: This imports the UserAdmin class from Django's authentication module. UserAdmin is a pre-built admin interface for managing user models.


2. Registering Models:
---------------------

    => admin.site.register(Account, UserAdmin): This line registers the Account model with the Django admin site and specifies the UserAdmin class as the admin interface for managing instances of the Account model.

3. Explanation:
--------------------

    => By registering the Account model with the admin site, Django automatically generates a user-friendly admin interface for managing Account instances.

    => The use of UserAdmin as the second argument indicates that the admin interface for managing Account instances will be based on the settings and configurations provided by UserAdmin. This includes features such as password management, user permissions, and group management.

    => Essentially, this code enables administrators to manage user accounts (Account instances) through the Django administration interface with features provided by UserAdmin.
"""