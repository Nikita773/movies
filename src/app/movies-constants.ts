import {Categories} from "./enums/movie-categories-keys";

export const movieCategories = new Map([
  [Categories.NOW_PLAYING, 'Now playing'],
  [Categories.POPULAR, 'Popular'],
  [Categories.TOP_RATED, 'Top rated'],
  [Categories.UPCOMING, 'Upcoming']
]);
