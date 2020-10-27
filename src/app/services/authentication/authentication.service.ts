import { NewUserDto } from './../../api/models/new-user-dto';
import { UserService } from './../../api/services/user.service';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  public getAuthenticationObs(): Observable<boolean> {
    const username = this.user.username;
    return this.userService.getUserExists({ username });
  }

  public authenticateUser(userExists: boolean) {
    console.log('login in auth service');
    if (userExists) {
      this.user.authenticated = true;
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      this.logout();
    }
  }

  public handleAuthenticateUserFailure(err) {
    this.clearUser();
  }

  public login(username: string, password: string): Observable<boolean> {
    this.user = new User(
      username, password, window.btoa(`${username}:${password}`)
    );
    return this.getAuthenticationObs();
  }

  public logout() {
    this.clearUser();
    this.router.navigate(['/home']);
  }

  public register(username: string, password: string): Observable<boolean> {
    const newUserDto = { username, password } as NewUserDto;
    const registerResponse = this.userService.registerNewUser({ body: newUserDto });
    return registerResponse;
  }

  private clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }

}
