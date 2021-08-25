import {Component, EventEmitter, Output} from '@angular/core';
import {MoviesHelper} from "../helpers/movies-helper";

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.scss']
})
export class MovieCategoriesComponent {
  @Output() onClickCategory = new EventEmitter<string>();
  categories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
  selectedIndex = 0;
  moviesHelper = MoviesHelper;

  setCategory(category: string): void {
    this.onClickCategory.emit(category);
  }

  setIndex(index: number): void {
    this.selectedIndex = index;
  }
}
