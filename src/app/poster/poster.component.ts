import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent {

  @Input() posterPath: string;
  @Input() id: number;
  @Output() onChangeEventEmitter = new EventEmitter<number>();

  constructor() {}

  getMovieImage(): string {
     return 'http://image.tmdb.org/t/p/w342' + this.posterPath;
  }

  setMovie(id: number): void {
    this.onChangeEventEmitter.emit(id)
  }

}
