import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MoviesInfoDataService} from "../services/movie-details.service";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {IMovie} from "../models/movie.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

  searchControl: FormControl;
  movieInfo: IMovie[];
  matDialogRef: MatDialogRef<DialogComponent>;

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
      debounceTime(250),
      distinctUntilChanged(),
      filter((text:string) => {
        if (text.length < 3 && this.matDialogRef) {
          this.matDialogRef.close();
          this.matDialogRef = null as any;
        }

        return text.length > 2;
      }),
      switchMap(value => {
        return this.moviesInfoDataService.searchMovies(value);
      }),
      takeUntil(this.onDestroy$))
      .subscribe(movie => {
        this.movieInfo = movie.results.slice(0,5);
        this.openDialog();
      })
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

  openDialog(): void {
    if (this.matDialogRef) {
      this.matDialogRef.componentInstance.movieDataList = this.movieInfo;
      return;
    }

   this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: this.movieInfo,
      width: '500px',
      hasBackdrop: false,
      position: {
        top: '2.5rem',
        left: '15rem'
      },
    });

    const subscribeDialog = this.matDialogRef.componentInstance.onSubmitClick.subscribe(id =>
      this.router.navigate(['movies', id])
    );
    this.matDialogRef.afterClosed().subscribe(() => subscribeDialog.unsubscribe);
  }
}
