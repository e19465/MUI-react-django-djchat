"""
In the context of Django, annotations typically refer to a feature provided by Django's ORM (Object-Relational Mapper) to add calculated fields or aggregates to querysets.

Annotations allow you to attach extra information to each object in the queryset without modifying the underlying data. This can be useful for adding computed values, aggregations, or annotations from related models to each object in the queryset.

Some common annotations in Django include:
------------------------------------------

1. Count: An annotation that calculates the number of related objects.
2. Sum: An annotation that calculates the sum of a field across related objects.
3. Avg: An annotation that calculates the average value of a field across related objects.
4. Max: An annotation that calculates the maximum value of a field across related objects.
5. Min: An annotation that calculates the minimum value of a field across related objects.
6. F expression: An annotation that allows you to reference the value of a field from the same model in a query.
7. ExpressionWrapper: An annotation that allows you to perform arithmetic or logical operations on fields.

=> Annotations are often used in conjunction with Django's ORM querysets and can be applied using the annotate() method.


<=============== code examples ===============>

---------------------------------------
1. Count

    from django.db.models import Count

    # Annotate the number of related authors for each book
    books_with_author_count = Book.objects.annotate(author_count=Count('authors'))

---------------------------------------

2. Sum

    from django.db.models import Sum

    # Annotate the total price of all books
    total_price = Book.objects.aggregate(total_price=Sum('price'))

---------------------------------------
    
3. Avg

    from django.db.models import Avg

    # Annotate the average price of all books
    average_price = Book.objects.aggregate(average_price=Avg('price'))

---------------------------------------

4. Max

    from django.db.models import Max

    # Annotate the maximum price of all books
    max_price = Book.objects.aggregate(max_price=Max('price'))


---------------------------------------
    
5. Min

    from django.db.models import Min

    # Annotate the minimum price of all books
    min_price = Book.objects.aggregate(min_price=Min('price'))

    
---------------------------------------

6. F Expression

    from django.db.models import F

    # Annotate the difference between price and discount_price for each book
    books_with_discount = Book.objects.annotate(discount_difference=F('price') - F('discount_price'))

    
---------------------------------------


7. ExpressionWrapper

    from django.db.models import ExpressionWrapper, F

    # Annotate the total price of a book after applying a discount
    books_with_discount = Book.objects.annotate(
        discounted_price=ExpressionWrapper(F('price') * 0.9, output_field=models.DecimalField())
    )

    
---------------------------------------



"""