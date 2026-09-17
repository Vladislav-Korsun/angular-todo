import { Component, computed, OnInit, signal } from '@angular/core';
import { TodoComponent } from '../../components/todo/todo';
import { TodoFormComponents } from '../../components/todo-form/todo-form';
import { TodoService } from '../../services/todo';
import { Todo, TodoPriority } from '../../types/todo';
import { TodoFilter, TodoSort } from '../../types/filter-sort';
import { FilterComponents } from '../../components/filter/filter';
import { FilterTodosPipe } from '../../pipes/filter-pipe';
import { ActivatedRoute } from '@angular/router';
import { SortComponents } from '../../components/sort/sort';
import { SortTodosPipe } from '../../pipes/sort-pipe';
import { MessageService } from '../../services/message';
import { MessageComponent } from '../../components/message/message';
import { LoadingService } from '../../services/loading';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  imports: [
    TodoComponent,
    TodoFormComponents,
    FilterComponents,
    FilterTodosPipe,
    SortComponents,
    SortTodosPipe,
    MessageComponent
  ],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.scss',
})
export class TodoPage implements OnInit {
  todos = signal<Todo[]>([]);
  filter = signal<TodoFilter>('all');
  sort = signal<TodoSort>('none');

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const filter = params.get('filter');

      if (
        filter === 'active' ||
        filter === 'completed' ||
        filter === 'all'
      ) {
        this.filter.set(filter);
      } else {
        this.filter.set('all');
      }
    });


    this.todoService.getTodo().subscribe({
      next: (todos: Todo[]) => {
        this.todos.set(todos);
      },
      error: () => {

      }
    })
  }

  createTodo(title: string, priority: TodoPriority): void {
    this.todoService.createTodo(title, priority)
      .subscribe({
        next: (todo: Todo) => {
          this.todos.update(todos => [
            ...todos,
            todo,
          ]);
          this.messageService.show(
            'Todo created successfully',
            'success',
          );
        },
        error: () => {
          this.messageService.show(
            'Unable create todo',
            'error'
          )
        },
      })
  }

  toggleTodo(todo: Todo): void {
    const completed = !todo.completed;

    this.loadingService.start(todo.id);

    this.todoService
      .updateTodo(todo.id, { completed })
      .pipe(
        finalize(() => {
          this.loadingService.stop(todo.id);
        }),
      )
      .subscribe({
        next: () => {
          this.todos.update(todos =>
            todos.map(item =>
              item.id === todo.id
                ? { ...item, completed }
                : item
            )
          );
          this.messageService.show(
            'Todo toggle successfully',
            'success',
          );
        },
        error: () => {
          this.messageService.show(
            'Unable toggle todo',
            'error'
          )
        },
      });
  }

  renameTodo(todo: Todo, title: string): void {
    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    this.loadingService.start(todo.id);

    this.todoService
      .updateTodo(todo.id, {
        title: newTitle,
      })
      .pipe(
        finalize(() => {
          this.loadingService.stop(todo.id);
        }),
      )
      .subscribe({
        next: () => {
          this.todos.update(todos =>
            todos.map(item =>
              item.id === todo.id
                ? { ...item, title: newTitle }
                : item
            )
          );
          this.messageService.show(
            'Todo rename successfully',
            'success',
          );
        },
        error: () => {
          this.messageService.show(
            'Unable rename todo',
            'error'
          )
        },
      });
  }

  changeTodoPriority(
    todo: Todo,
    priority: TodoPriority
  ): void {
    this.loadingService.start(todo.id);

    this.todoService
      .updateTodo(todo.id, { priority })
      .pipe(
        finalize(() => {
          this.loadingService.stop(todo.id);
        }),
      )
      .subscribe({
        next: () => {
          this.todos.update(todos =>
            todos.map(item =>
              item.id === todo.id
                ? { ...item, priority }
                : item
            )
          );
          this.messageService.show(
            'Todo change priority successfully',
            'success',
          );
        },
        error: () => {
          this.messageService.show(
            'Unable change todo prioruty',
            'error'
          )
        },
      });
  }

  deleteTodo(todo: Todo): void {
    this.loadingService.start(todo.id);

    this.todoService
      .deleteTodo(todo)
      .pipe(
        finalize(() => {
          this.loadingService.stop(todo.id);
        }),
      )
      .subscribe({
        next: () => {
          this.todos.update(todos =>
            todos.filter(item => item.id !== todo.id)
          );
          this.messageService.show(
            'Todo delete successfully',
            'success',
          );
        },
        error: () => {
          this.messageService.show(
            'unable todo delete',
            'error'
          )
        }
      })
  }

}
