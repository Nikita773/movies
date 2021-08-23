import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export default class MoviesHelper {
  getMovieImage(image: string): string {
    return 'http://image.tmdb.org/t/p/w342' + image;
  }

  getMovieBackground(background: string): string {
    return 'http://image.tmdb.org/t/p/w342' + background;
  }
}
