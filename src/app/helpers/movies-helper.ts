export class MoviesHelper {
  static getMovieImageUrl(imageUrl: string): string {
    return 'http://image.tmdb.org/t/p/w342' + imageUrl;
  }
  static categoryTransform(category: string): string {
    return (category.charAt(0).toUpperCase() + category.slice(1)).split('_').join(' ');
  }
}
