import { Component, EventEmitter, Output } from '@angular/core';
import { TodoPriority } from '../../types/todo';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoFormComponents {
  @Output() save = new EventEmitter<{
    title: string;
    priority: TodoPriority;
  }>();

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
    priority: new FormControl<TodoPriority>('low', {
      nonNullable: true,
    }),
  });

  priorities: TodoPriority[] = ['low', 'medium', 'high'];

  get title() {
    return this.todoForm.controls.title;
  }

  get priority() {
    return this.todoForm.controls.priority;
  }

  handleFormSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const { title, priority } = this.todoForm.getRawValue();

    this.save.emit({
      title,
      priority,
    });

    this.todoForm.reset({
      title: '',
      priority: 'low',
    });
  }
}
