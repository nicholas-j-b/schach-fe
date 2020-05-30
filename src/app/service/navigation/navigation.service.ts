import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly router: Router
  ) { }

  public goToBoard(args) {
    this.router.navigate(['/board'], {queryParams: args});
  }

  public joinGame() {
    this.goToBoard({
      create: 'join'
    });
  }

  public createGame() {
    this.goToBoard({
      create: 'create'
    });
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }
}
