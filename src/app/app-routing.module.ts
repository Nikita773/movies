import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";

const routes: Routes = [
  { path: 'movies', component: MainComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
