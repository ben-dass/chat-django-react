# from django.shortcuts import render
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from .models import Server
from .serializer import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        """Retrieve a list of servers based on query parameters.

        This method retrieves a list of servers based on the provided query
        parameters. The resulting list can be filtered by category, user, server
        ID, or limited to a specific quantity. The method also supports annotating
        the queryset with the count of members for each server.

        Args:
            request (HttpRequest): The request object containing the query parameters.

        Returns:
            Response: A response containing a serialized list of servers.

        Raises:
            AuthenticationFailed: If authentication fails for filtering by user or server ID.
            ValidationError: If the server ID is invalid or not found.

        Query Parameters:
            - category (str, optional): Filter servers by category name.
            - qty (int, optional): Limit the number of servers to the specified quantity.
            - by_user (bool, optional): Filter servers by the authenticated user.
            - by_serverid (int, optional): Filter servers by the server ID.
            - with_num_members (bool, optional): Annotate the queryset with the count
              of members for each server.

        """

        # Get query parameters from the request
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # Check authentication if filtering by user or server ID
        if by_user or by_serverid and not request.user.is_authenticated:
            raise AuthenticationFailed()

        # Apply filtering based on the category
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Apply filtering based on the user ID
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        # Annotate the queryset with the count of members if requested
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Limit the queryset to a specified quantity
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filter the queryset based on server ID if provided
        if by_serverid:
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_serverid} not found")
            except ValueError:
                raise ValidationError(detail="Server value error")

        # Serialize the queryset and return the response
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)
