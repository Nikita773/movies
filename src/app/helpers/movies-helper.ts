export class MoviesHelper {
  static getMovieImageUrl(imageUrl: string): string {
    return 'http://image.tmdb.org/t/p/w342' + imageUrl;
  }
}
