from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path("todos/", views.todo_list, name="todo-list"),
    path("todos/<int:pk>/", views.todo_detail, name="todo-detail"),
    path("todos/completed/", views.completed_todos, name="completed-todos"),
    path("todos/pending/", views.pending_todos, name="pending-todos"),
    path("todos/<int:pk>/toggle/", views.toggle_todo_completion, name="toggle-todo"),
    path(
        "todos/delete-completed/",
        views.delete_completed_todos,
        name="delete-completed-todos",
    ),
]
