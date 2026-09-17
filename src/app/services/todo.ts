import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Todo, TodoPriority, UpdateTodo } from '../types/todo';
import { map } from 'rxjs';

const USER_ID = 6;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodo() {
    return this.http
      .get<Todo[]>(this.apiUrl, {
        params: {
          userId: USER_ID,
        },
      })
      .pipe(
        map(todos =>
          todos.map(todo => ({
            ...todo,
            priority: todo.priority ?? 'low',
          }))
        )
      );
  }

  createTodo(title: string, priority: TodoPriority) {
    const id = Date.now();

    return this.http
      .post<Todo>(this.apiUrl, {
        userId: USER_ID,
        id,
        title,
        completed: false,
        priority,
      })
      .pipe(
        map(todo => ({
          ...todo,
          id,
        }))
      );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<void>(
      `${this.apiUrl}/${todo.id}`,
    );
  }

  updateTodo(id: number, changes: UpdateTodo) {
    return this.http.patch<Todo>(
      `${this.apiUrl}/${id}`,
      changes,
    );
  }
}
