import { LobbyPageComponent } from './pages/lobby/lobby-page/lobby-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'game/:gameId',
    component: BoardPageComponent
  },
  {
    path: 'lobby',
    component: LobbyPageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }

];


@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
