import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MoviesInfoDataService} from "../services/movie-details.service";
import {debounceTime, distinctUntilChanged, filter, switchMap, take, takeUntil} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {IMovie} from "../models/movie.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MovieSearchDialogComponent} from "../movie-search-dialog/movie-search-dialog.component";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

  searchControl: FormControl;
  matDialogRef: MatDialogRef<MovieSearchDialogComponent>;

  private onDestroy$ = new Subject<void>();

  constructor(
    public matDialog: MatDialog,
    private moviesInfoDataService: MoviesInfoDataService,
    private elementRef : ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchControl = new FormControl();
      this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((text:string) => {
        if (text.length < 3 && this.matDialogRef) {
          this.matDialogRef.close();
          this.matDialogRef = null as any;
        }

        return text.length > 2;
      }),
      switchMap(value => this.moviesInfoDataService.getMovieInfoByTitle(value)),
      takeUntil(this.onDestroy$))
        .subscribe(movie => this.openSearchedMovies(movie.results.slice(0,5)));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  @HostListener('document:click', ['$event.target'])
  onHandleClick(targetElement: MatDialogRef<IMovie[]>) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.searchControl.setValue('');
    }
  }

  openSearchedMovies(movieInfo: IMovie[]): void {
    if (this.matDialogRef) {
      this.matDialogRef.componentInstance.movieDataList = movieInfo;
      return;
    }

   this.matDialogRef = this.matDialog.open(MovieSearchDialogComponent, {
      data: { movieSearchData: movieInfo },
      width: '500px',
      hasBackdrop: false,
      position: {
        top: '2.5rem',
        left: '15rem'
      },
    });

    this.matDialogRef.componentInstance.onMovieClick.pipe(
      take(1),
      takeUntil(this.onDestroy$))
      .subscribe(id =>
      this.router.navigate(['movies', id])
    );
  }
}
