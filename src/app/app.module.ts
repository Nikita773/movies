import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PosterComponent } from './poster/poster.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PosterlistComponent } from './posterlist/posterlist.component';
import { TitleComponent } from './title/title.component';
import { MainComponent } from './main/main.component';
import { ShadowCardDirective } from "./directives/style.directive";


@NgModule({
  declarations: [
    AppComponent,
    PosterComponent,
    ToolbarComponent,
    PosterlistComponent,
    TitleComponent,
    MainComponent,
    ShadowCardDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
