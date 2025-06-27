import { Injectable } from '@angular/core';
import { ToDo } from '../interface/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: ToDo[] = [];
  private nextId = 1;

  constructor() {}

  getTodos(): ToDo[] {
    return this.todos;
  }

  addTodo(title: string, dueDate?: Date): void {
    const newTodo: ToDo = {
      id: this.nextId++,
      title: title,
      completed: false,
      dueDate: dueDate
    }
    this.todos.push(newTodo);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}
