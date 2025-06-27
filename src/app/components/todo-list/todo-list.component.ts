import { Component } from '@angular/core';
import { ToDo } from '../../interface/todo.interface';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule, MatIconModule, MatListModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: ToDo[] = [];
  newTodoTitle: string = '';
  newTodoDate: Date | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle, this.newTodoDate || undefined);
      this.newTodoTitle = '';
      this.newTodoDate = null;
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
