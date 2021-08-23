import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { MoviesInfoDataService } from "../services/movie-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import {distinctUntilChanged, map, switchMap, takeUntil} from "rxjs/operators";
import { IMovie } from "../models/movie.interface";
import { MoviesHelper } from "../helpers/movies-helper";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails: IMovie;
  moviesHelper = MoviesHelper

  private onDestroy$ = new Subject<void>();

  constructor(
    private moviesInfoDataService: MoviesInfoDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMoviesInfoData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getMoviesInfoData(): void {
    this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$),
        switchMap(params => this.moviesInfoDataService.getMovieInfoById(params.id))
      )
      .subscribe(movieDetails => this.movieDetails = movieDetails);
  }
}
