import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly router: Router
  ) { }

  public goToBoard() {
    this.router.navigate(['/board']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }
}
