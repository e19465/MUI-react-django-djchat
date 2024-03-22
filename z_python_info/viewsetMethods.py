"""
1. list(self, request):

    => This method is responsible for handling GET requests to list multiple instances of a resource.
    => Typically used to retrieve a collection of resource instances.
    => Executes queries to retrieve all instances of the resource.
    => Returns a serialized representation of the instances in the response.
    
2. create(self, request):

    => This method is responsible for handling POST requests to create a new instance of a resource.
    => Receives data from the request payload to create a new instance.
    => Validates the data and saves the new instance to the database.
    => Returns a serialized representation of the created instance in the response.

    
3. retrieve(self, request, *args, **kwargs):

    => This method handles GET requests to retrieve a single instance of a resource by its primary key (pk).
    => Receives the primary key of the instance to be retrieved as a parameter (pk).
    => Fetches the instance with the given pk from the database.
    => Returns a serialized representation of the retrieved instance in the response.

    
4. update(self, request, *args, **kwargs):

    => This method handles PUT requests to update a single instance of a resource by its primary key (pk).
    => Receives the primary key of the instance to be updated as a parameter (pk).
    => Retrieves the instance from the database, updates it with the data from the request payload, and saves the changes.
    => Returns a serialized representation of the updated instance in the response.

    
5. partial_update(self, request, *args, **kwargs):

    => This method handles PATCH requests to update a single instance of a resource partially by its primary key (pk).
    => Receives the primary key of the instance to be partially updated as a parameter (pk).
    => Retrieves the instance from the database, updates specific fields with the data from the request payload, and saves the changes.
    => Returns a serialized representation of the partially updated instance in the response.

6. destroy(self, request, *args, **kwargs):

    => This method handles DELETE requests to delete a single instance of a resource by its primary key (pk).
    => Receives the primary key of the instance to be deleted as a parameter (pk).
    => Deletes the instance with the given pk from the database.
    => Returns a success message or an appropriate response indicating the deletion was successful.

"""