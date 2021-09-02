import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IMovie} from "../models/movie.interface";
import {IMovieSearchData} from "../models/movie-search-data.interface";
import {MoviesHelper} from "../helpers/movies-helper";

@Component({
  selector: 'app-dialog',
  templateUrl: './movie-search-dialog.component.html',
  styleUrls: ['./movie-search-dialog.component.scss']
})

export class MovieSearchDialogComponent implements OnInit {
  moviesHelper = MoviesHelper;
  movieDataList: IMovie[];
  onHandleClick = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IMovieSearchData) {}

  ngOnInit() {
    if (this.movieDataList) {
      this.movieDataList = this.data.movieSearchData;
    }
    return;
  }

  onMoviePageOpen(id: number): void {
    this.onHandleClick.emit(id);
  }
}
