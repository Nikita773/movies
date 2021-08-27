import {Component, Input} from '@angular/core';
import {Categories} from "../enums/movie-categories-keys";
import {movieCategories} from "../movies-constants";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() category: Categories;
  movieCategories = movieCategories;
}
