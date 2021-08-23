import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoviesHelper } from "../helpers/movies-helper";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent {
  @Input() posterPath: string;
  @Output() onPosterClick = new EventEmitter<void>();

  moviesHelper = MoviesHelper

  setMovie(): void {
    this.onPosterClick.emit();
  }
}
