import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { MoviesInfoDataService } from "../services/movie-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";
import { IMovie } from "../models/movie.interface";
import MoviesHelper from "../helpers/movies-helper";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails: IMovie;

  private onDestroy$ = new Subject<void>();

  constructor(
    public moviesHelper: MoviesHelper,
    private moviesInfoDataService: MoviesInfoDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.onActivatedRoute();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private getMoviesInfoData(id: number): void {
    this.moviesInfoDataService.getMovieInfoById(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(movieDetails =>
        this.movieDetails = movieDetails)
  }

  onActivatedRoute(): void {
    this.activatedRoute.params
      .pipe(
        map(params => params.id),
        takeUntil(this.onDestroy$)
      )
      .subscribe(id => this.getMoviesInfoData(id));
  }
}
