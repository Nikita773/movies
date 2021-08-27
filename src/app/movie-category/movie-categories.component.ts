import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.scss']
})
export class MovieCategoriesComponent implements OnInit {
  @Input() categories: Map<string,string>;
  @Output() onClickCategory = new EventEmitter<string>();
  selectedCategory: string;

  ngOnInit(): void {
    if (this.categories) {
      this.selectedCategory = Array.from(this.categories.keys())[0];
    }
  }

  setCategory(category: string): void {
    this.onClickCategory.emit(category);
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }
}
