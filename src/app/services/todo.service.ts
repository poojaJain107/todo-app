import { Injectable } from '@angular/core';
import { ToDo } from '../interface/todo.interface';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: ToDo[] = [];
  private nextId = 1;
  private todosRef = collection(this.firestore, 'todos');

  constructor( private firestore: Firestore) {}

  // getTodos(): ToDo[] {
  //   return this.todos;
  // }
    // addTodo(title: string, dueDate?: Date): void {
  //   const newTodo: ToDo = {
  //     id: this.nextId++,
  //     title: title,
  //     completed: false,
  //     dueDate: dueDate
  //   }
  //   this.todos.push(newTodo);
  // }

  getTodos(): Observable<ToDo[]> {
    const todosQuery = query(this.todosRef, orderBy('dueDate', 'asc'));
    return collectionData(todosQuery, { idField: 'id' }) as Observable<ToDo[]>;
  }

  addTodo(todo: Omit<ToDo, 'id'>): Promise<void> {
    return addDoc(this.todosRef, {
      ...todo,
      dueDate: todo.dueDate // Firestore Timestamp or JS Date
    }).then(() => {
      console.log('Todo added successfully!');
    }).catch(error => {
      console.error('Error adding todo:', error);
    });
  }

  deleteTodo(id: string): Promise<void> {
    const todoDocRef = doc(this.firestore, 'todos', id);
    return deleteDoc(todoDocRef).then(() => {
      console.log('Todo added successfully!');
    }).catch(error => {
      console.error('Error adding todo:', error);
    });
  }

  toggleTodo(isCompleted:boolean, id: string): Promise<void> {
    const todoDocRef = doc(this.firestore, 'todos', id);
    return updateDoc(todoDocRef, {
      completed: isCompleted 
    }).then(() => {
      console.log('Todo updated successfully!');
    }).catch(error => {
      console.error('Error adding todo:', error);
    });
  }
}
