import { Component, ElementRef, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';
import { Todo, TodoPriority } from '../../types/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() loading = false;

  @Output() delete = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() rename = new EventEmitter<string>();
  @Output() priorityChange = new EventEmitter<TodoPriority>();

  @ViewChild('titleField')
  set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  editing = false;
  changePriority = false;
  title = '';
  priorities: TodoPriority[] = ['low', 'medium', 'high'];


  edit(): void {
    this.editing = true;
    this.title = this.todo.title;
  }

  handlechangePriority(): void {
    this.changePriority = true;
  }

  savePriority(priority: TodoPriority): void {
    this.priorityChange.emit(priority);
    this.changePriority = false;
  }

  cancelEditing(): void {
    this.editing = false;
    this.title = '';
  }

  save() {
    if (!this.editing) return;

    this.rename.emit(this.title);
    this.editing = false;
  }
}
