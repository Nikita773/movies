import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMovie } from "../models/movie.interface";
import { MoviesDataService } from "../services/posters.service";
import { Subject} from "rxjs";
import { distinctUntilChanged, map, takeUntil, tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-poster-list',
  templateUrl: './posterlist.component.html',
  styleUrls: ['./posterlist.component.scss']
})

export class PosterlistComponent implements OnInit, OnDestroy {
  movies: IMovie[];
  totalPages: number;
  page: number;

  private onDestroy$ = new Subject<void>();

  constructor(
    private moviesDataService: MoviesDataService,
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

  trackById(index: number, movie: IMovie): number {
    return movie.id;
  }

  private getMovieData(pageNo: number): void {
    this.moviesDataService.getMovies(pageNo)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(moviesInfo => {
        this.movies = moviesInfo.results;
        this.totalPages = moviesInfo.total_pages;
      })
  }

  onPageChange(pageNo: number): void {
    this.router.navigate(['movies'], {
      queryParams: {
        page: pageNo
      }
    });
  }

  onActivatedRoute(): void {
    this.activatedRoute.queryParams
      .pipe(
        map(queryParams => queryParams.page ? +queryParams.page : 1),
        distinctUntilChanged(),
        tap(page => this.page = page),
        takeUntil(this.onDestroy$)
      )
      .subscribe(page => this.getMovieData(page));
  }
}
