import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMovie} from "../models/movie.interface";
import {MoviesDataService} from "../services/posters.service";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Categories} from "../enums/movie-categories-keys";

@Component({
  selector: 'app-poster-list',
  templateUrl: './posterlist.component.html',
  styleUrls: ['./posterlist.component.scss']
})

export class PosterlistComponent implements OnInit, OnDestroy {
  movies: IMovie[];
  totalPages: number;
  page: number;
  category: Categories;

  private onDestroy$ = new Subject<void>();

  constructor(
    private moviesDataService: MoviesDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovieData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  trackById(index: number, movie: IMovie): number {
    return movie.id;
  }

  onPageChange(pageNo: number): void {
    this.router.navigate(['movies'], {
      queryParams: {
        category: this.category,
        page: pageNo
      }
    });
  }

  getMovieData(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap(queryParams => {
          const category = queryParams.category ? queryParams.category : Categories.NOW_PLAYING;
          const newPage = queryParams.page ? +queryParams.page : 1;
          this.page = newPage;
          this.category = category;

          return this.moviesDataService.getMovies(category, newPage);
        }),
        takeUntil(this.onDestroy$),
      )
      .subscribe(moviesInfo => {
        this.movies = moviesInfo.results;
        this.totalPages = moviesInfo.total_pages;
    });
  }

  onMoviePageChange(id: number): void {
    this.router.navigate(['movies', id]);
  }
}
