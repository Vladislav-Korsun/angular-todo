export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  priority: TodoPriority;
}

export type UpdateTodo = Partial<
  Pick<Todo, 'title' | 'completed' | 'priority'>
>;
