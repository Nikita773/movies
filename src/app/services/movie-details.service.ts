import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { IMovie } from "../models/movie.interface";
import {IMoviesInfo} from "../models/movies-info.interface";

@Injectable({ providedIn: 'root' })
export class MoviesInfoDataService {
  constructor(private http: HttpClient) {}

  getMovieInfoById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`http://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`);
  }

  getMovieInfoByTitle(title: string):Observable<IMoviesInfo>{
    return this.http.get<IMoviesInfo>(`https://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=${title}`)
  }
}
