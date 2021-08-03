import { Component, Input } from '@angular/core';
import { IMovie } from "../models/movie.interface";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent {
  @Input() movie: IMovie;

  getMovieImage() : string {
     return 'http://image.tmdb.org/t/p/w342' + this.movie.backdrop_path;
  }
}
