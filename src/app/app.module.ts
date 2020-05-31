import { Game } from './model/game/game';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LobbyPageComponent } from './pages/lobby/lobby-page/lobby-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardPageComponent,
    HomePageComponent,
    LobbyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    //Game
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
