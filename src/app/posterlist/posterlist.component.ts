import {Component, OnDestroy, OnInit} from '@angular/core';
import { IMovie } from "../models/movie.interface";
import { IMoviesInfo } from "../models/movies-info.interface";
import { MoviesDataService } from "../services/posters.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-poster-list',
  templateUrl: './posterlist.component.html',
  styleUrls: ['./posterlist.component.scss']
})
export class PosterlistComponent implements OnInit, OnDestroy {
  movies: IMovie[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private postersService: MoviesDataService) { }

  trackById(index: number, movie: IMovie) : number {
    return movie.id;
  }

  ngOnInit() :void {
    this.postersService.getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moviesInfo: IMoviesInfo) => {
        this.movies = moviesInfo.results;
      });
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
