import { Component, Input, Output } from '@angular/core';
import { TodoFilter } from '../../types/filter-sort';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter',
  imports: [RouterLink],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class FilterComponents {
  @Input() currentFilter: TodoFilter = 'all';
}
