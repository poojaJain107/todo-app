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
import { Timestamp } from 'firebase/firestore';
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
    this.todoService.getTodos().subscribe((res:any) => {
      this.todos = res
      this.todos.forEach((res:any)=>{
        res.dueDate = res?.dueDate.toDate()
      })
      console.log(this.todos)

    });
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      let obj: ToDo = {
        id: '',
        title: this.newTodoTitle,
        dueDate: new Date(this.newTodoDate ? this.newTodoDate.getTime() : Date.now()),
        completed: false
      }
      this.todoService.addTodo(obj);
      this.newTodoTitle = '';
      this.newTodoDate = null;
    }
  }

  toggleTodo(event:any, id: string) {
    this.todoService.toggleTodo(event.checked, id);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
}
