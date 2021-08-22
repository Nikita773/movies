import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { MoviesInfoDataService } from "../services/movie-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  background: string;
  image: string;
  title: string;
  score: number;
  popularity: number;
  date: string;
  overview: string;

  private onDestroy$ = new Subject<void>();

  constructor(
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
    this.moviesInfoDataService.getMovieInfo(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(movieDetails => {
        this.background = movieDetails.backdrop_path;
        this.image = movieDetails.poster_path;
        this.title = movieDetails.title;
        this.score = movieDetails.vote_average;
        this.popularity = movieDetails.popularity;
        this.date = movieDetails.release_date;
        this.overview = movieDetails.overview;
      })
  }

  onActivatedRoute(): void {
    this.activatedRoute.params
      .pipe(
        map(params => params.id),
        takeUntil(this.onDestroy$)
      )
      .subscribe(id => this.getMoviesInfoData(id));
  }

  getMovieImage(): string {
    return 'http://image.tmdb.org/t/p/w342' + this.image;
  }

  getMovieBackground(): string {
    return 'http://image.tmdb.org/t/p/w342' + this.background;
  }
}
