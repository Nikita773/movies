import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent {
  @Input() totalPages: number;
  @Input() pageNo: number;
  @Output() onChangeEventEmitter = new EventEmitter<number>();

  setPage(page: number): void {
    this.onChangeEventEmitter.emit(page)
  }
}

