import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IMovie } from "../models/movie.interface";

@Injectable({ providedIn: 'root' })
export class MoviesInfoDataService {
  constructor(private http: HttpClient) {}

  getMovieInfoById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`http://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`);
  }
}
