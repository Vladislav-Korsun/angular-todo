import { Pipe, PipeTransform } from '@angular/core';
import { Todo, TodoPriority } from '../types/todo';
import { TodoSort } from '../types/filter-sort';

@Pipe({
  name: 'sortTodos',
  standalone: true,
})
export class SortTodosPipe implements PipeTransform {
  transform(
    todos: Todo[],
    sort: TodoSort,
  ): Todo[] {
    const priorityOrder: Record<TodoPriority, number> = {
      low: 1,
      medium: 2,
      high: 3,
    };

    if (sort === 'none') {
      return todos;
    }

    return [...todos].sort((a, b) => {
      if (sort === 'low-to-high') {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}
