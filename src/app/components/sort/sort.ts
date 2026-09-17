import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoSort } from '../../types/filter-sort';

@Component({
  selector: 'app-sort',
  imports: [FormsModule],
  templateUrl: './sort.html',
  styleUrl: './sort.scss',
})
export class SortComponents {
  @Input() currentSort: TodoSort = 'none';

  @Output() sortChange = new EventEmitter<TodoSort>();
}
