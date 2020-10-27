import { NewUserDto } from './../../api/models/new-user-dto';
import { UserService } from './../../api/services/user.service';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }

  public isUserLoggedIn(): boolean {
    return this.user?.authenticated;
  }

  public authenticateCurrentUser(): Observable<boolean> {
    const username = this.user.username;
    return this.userService.getUserExists({ username }).pipe(
      tap(
        userExists => {
          if (userExists) {
            this.user.authenticated = true;
            localStorage.setItem('user', JSON.stringify(this.user));
          } else {
            this.logout();
          }
        },
        err => {}
      )
    );
  }

  public handleAuthenticateUserFailure(err) {
    this.clearUser();
  }

  public login(username: string, password: string): Observable<boolean> {
    this.user = new User(
      username, password, window.btoa(`${username}:${password}`)
    );
    return this.authenticateCurrentUser();
  }

  public logout() {
    this.clearUser();
    this.router.navigate(['/home']);
  }

  public register(username: string, password: string): Observable<boolean> {
    const newUserDto = { username, password } as NewUserDto;
    return this.userService.registerNewUser({ body: newUserDto }).pipe(
      tap(
        res => {
          this.login(username, password);
        },
        err => {}
      )
    );
  }

  private clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }

}
