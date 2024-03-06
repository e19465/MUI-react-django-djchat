"""
    def category_icon_upload_path(instance, filename):
        return f"category/{instance}/category_icon/{filename}"

    class Category(models.Model):
        name = models.CharField(max_length=100)
        description = models.TextField(blank=True, null=True)
        icon = models.FileField(upload_to=category_icon_upload_path, null=True, blank=True)

        def save(self, *args, **kwargs):
            if self.id:
                existing = get_object_or_404(Category, id=self.id)
                if existing.icon != self.icon:
                    existing.icon.delete(save=False)
                    super(Category, self).save(*args, **kwargs)

        @receiver(models.signals.pre_delete, sender="server.Category")
        def category_delete_files(sender, instance, *args, **kwargs):
            for field in instance._meta.fields:
                if field.name == "icon":
                    file = getattr(instance, field.name)
                    if file:
                        file.delete(save=False)

        def __str__(self):
            return self.name
"""


"""
This Python file contains a Django model and associated functions for managing categories with an optional icon image upload feature.

1. category_icon_upload_path Function:

    def category_icon_upload_path(instance, filename):
        return f"category/{instance}/category_icon/{filename}"

    - This function determines the upload path for the category icon file.
    - It takes two arguments: instance (the instance of the Category model) and filename (the  original filename of the uploaded file).
    - It constructs a path where the uploaded file will be stored within the MEDIA_ROOT directory.
    - The {instance} part will be replaced with the string representation of the Category instance.

2. Category Model:
    - This defines the Category model with three fields: name, description, and icon.
    - name is a character field to store the name of the category.
    - description is a text field to store an optional description of the category.
    - icon is a FileField used for uploading an icon image for the category. The upload_to argument specifies the function to determine the upload path.

3. save Method Override:

    def save(self, *args, **kwargs):
            if self.id:
                existing = get_object_or_404(Category, id=self.id)
                if existing.icon != self.icon:
                    existing.icon.delete(save=False)
                    super(Category, self).save(*args, **kwargs)

    - This method overrides the default save method of the Category model.
    - It ensures that when a category instance is saved:
        
        => If the category already exists in the database (self.id is not None), it checks if the icon has been updated.
        
        => If the icon has been updated (existing.icon != self.icon), it deletes the old icon file associated with the category (existing.icon.delete()).
        
        => Finally, it calls the superclass save method to save the updated instance.

4. category_delete_files Signal Receiver:

    @receiver(models.signals.pre_delete, sender="server.Category")
        def category_delete_files(sender, instance, *args, **kwargs):
            for field in instance._meta.fields:
                if field.name == "icon":
                    file = getattr(instance, field.name)
                    if file:
                        file.delete(save=False)

    - This is a signal receiver function that listens to the pre_delete signal of the Category model.
    - It ensures that when a category instance is deleted:
        => It iterates over the fields of the Category model.
        => If the field name is icon, it retrieves the file associated with the instance using getattr.
        => It deletes the associated file if it exists (file.delete()).

5. __str__ Method:
    - This method provides a human-readable representation of the Category instance, returning its name.
"""
