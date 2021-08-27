import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {movieCategories} from "../movies-constants";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  title = 'Movies';
  movieCategories = movieCategories;

  constructor(private router: Router) {}

  onCategoryChange(category: string): void {
    this.router.navigate(['movies'], {
      queryParams: {
        category: category
      }
    });
  }

}
