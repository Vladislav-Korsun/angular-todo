import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo';
import { TodoFilter } from '../types/filter-sort';

@Pipe({
  name: 'filterTodos',
  standalone: true,
})
export class FilterTodosPipe implements PipeTransform {
  transform(
    todos: Todo[],
    filter: TodoFilter,
  ): Todo[] {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }
}
