import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly router: Router
  ) { }

  public goToGame(gameId: string) {
    this.router.navigate([`/game/${gameId}`]);
  }

  public goToLobby() {
    this.router.navigate(['/lobby']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }
}
