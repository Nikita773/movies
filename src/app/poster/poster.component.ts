import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent {

  @Input() posterPath: string;

  getMovieImage(): string {
     return 'http://image.tmdb.org/t/p/w342' + this.posterPath;
  }
}
