from django.shortcuts import render
from rest_framework import viewsets
from .models import Server
from .serializers import SeverSerializer
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
# Create your views here.


# class that provide CRUD operations
class ServerListViewSet(viewsets.ViewSet):
    
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server = request.query_params.get("server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if (by_user or by_server) and (not request.user.is_authenticated):
            raise AuthenticationFailed()

        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        if category:
            
            # fiter all servers by category ID (category in Server model is Foreign key which contains PK of category)
            # self.queryset = self.queryset.filter(category= category)

            # fiter all servers by category name (category in Server model is Foreign key which contains PK of category)
            self.queryset = self.queryset.filter(category__name= category)

        if by_server:
            try:
                self.queryset = self.queryset.filter(id=by_server)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_server} is not found")
            except ValueError:
                raise ValidationError(detail="Server value error")

        if qty:
            #The [: int(qty)] part in Python is called slicing. It allows you to retrieve a portion of a sequence, such as a list or a queryset in this case
            self.queryset = self.queryset[: int(qty)]
        
        if with_num_members:
            # with execution of below, self.queryset gets a field called num_members with the corresponding value
            self.queryset = self.queryset.annotate(num_members=Count('member'))


        serializer = SeverSerializer(self.queryset, many=True, context={"num_members":with_num_members})
        return Response(serializer.data)

