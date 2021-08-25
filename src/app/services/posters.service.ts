import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IMoviesInfo } from "../models/movies-info.interface";

@Injectable({ providedIn: 'root' })
export class MoviesDataService {
  constructor(private http: HttpClient) {}

  getMovies(category: string, page: number): Observable<IMoviesInfo> {
    return this.http.get<IMoviesInfo>(`http://api.themoviedb.org/3/movie/${category}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`);
  }
}
