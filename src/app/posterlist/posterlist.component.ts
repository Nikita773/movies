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
  private onDestroy$: Subject<void> = new Subject();

  constructor(private postersService: MoviesDataService) { }

  ngOnInit() : void {
    this.getData();
  }

  ngOnDestroy() : void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  trackById(index: number, movie: IMovie) : number {
    return movie.id;
  }

  getData() : void {
    this.postersService.getMovies()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((moviesInfo: IMoviesInfo) => {
        this.movies = moviesInfo.results;
      });
  }
}
