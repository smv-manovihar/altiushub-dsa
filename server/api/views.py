from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import Todo
from .serializers import TodoSerializer


@api_view(["GET", "POST"])
def todo_list(request):
    """
    List all todos or create a new todo.
    """
    if request.method == "GET":
        todos = Todo.objects.all().order_by("-created_at")
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def todo_detail(request, pk):
    """
    Retrieve, update or delete a specific todo.
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PATCH":
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        todo.delete()
        return Response(
            {"message": "Todo deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )


@api_view(["GET"])
def completed_todos(request):
    """
    List all completed todos.
    """
    todos = Todo.objects.filter(completed=True).order_by("-updated_at")
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def pending_todos(request):
    """
    List all pending (incomplete) todos.
    """
    todos = Todo.objects.filter(completed=False).order_by("-created_at")
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
def toggle_todo_completion(request, pk):
    """
    Toggle the completion status of a todo.
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)

    todo.completed = not todo.completed
    todo.save()

    serializer = TodoSerializer(todo)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_completed_todos(request):
    """
    Delete all completed todos.
    """
    deleted_count = Todo.objects.filter(completed=True).delete()[0]
    return Response(
        {"message": f"{deleted_count} completed todos deleted successfully"},
        status=status.HTTP_200_OK,
    )
