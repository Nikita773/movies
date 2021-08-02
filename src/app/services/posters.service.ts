import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Poster {
  dates: Dates
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Dates {
  maximum: string
  minimum: string
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string,
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

@Injectable({providedIn: 'root'})
export class PostersService {
  constructor(private http: HttpClient) {}

  url : string = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c'

  fetchPosters(): Observable<Poster> {
    return this.http.get<Poster>(this.url)
  }
}
