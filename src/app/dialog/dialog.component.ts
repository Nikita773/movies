import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IMovie} from "../models/movie.interface";
import {MoviesHelper} from "../helpers/movies-helper";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  onSubmitClick = new EventEmitter<number>();
  moviesHelper = MoviesHelper;
  movieDataList: IMovie[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      movieSearchData: IMovie[]
    }) {}

  ngOnInit() {
    this.movieDataList = this.data.movieSearchData;
  }

  onMoviePageOpen(id: number): void {
    this.onSubmitClick.emit(id);
  }
}
