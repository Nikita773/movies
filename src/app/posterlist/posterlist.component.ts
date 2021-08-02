import {Component, OnInit} from '@angular/core';
import {Movie, Poster, PostersService} from "../services/posters.service";

@Component({
  selector: 'app-posterlist',
  templateUrl: './posterlist.component.html',
  styleUrls: ['./posterlist.component.scss']
})
export class PosterlistComponent implements OnInit {

  movies: Movie[] = []

  constructor(private postersService: PostersService) {
  }

  ngOnInit() {
    this.postersService.fetchPosters()
      .subscribe((response: Poster) => {
        this.movies = response.results
      });
  }

}
