import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../services/posters.service";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {

  @Input() movie: Movie

  constructor() {}

  ngOnInit() {

  }

}
