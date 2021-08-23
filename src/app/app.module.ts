import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { ShadowCardDirective } from "./directives/shadow-card.directive";

import { AppComponent } from './app.component';
import { PosterComponent } from './poster/poster.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PosterlistComponent } from './posterlist/posterlist.component';
import { TitleComponent } from './title/title.component';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MovieDetailsComponent } from "./movie-details/movie-details.component";

import { DateReversePipe } from './pipes/date-reverse.pipe';
import { DateToYearPipe } from "./pipes/date-to-year.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PosterComponent,
    ToolbarComponent,
    PosterlistComponent,
    TitleComponent,
    MainComponent,
    ShadowCardDirective,
    PaginationComponent,
    MovieDetailsComponent,
    DateReversePipe,
    DateToYearPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
