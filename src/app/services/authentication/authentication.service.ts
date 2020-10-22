import { HttpClient } from '@angular/common/http';
import { HealthService } from './../../api/services/health.service';
import { UserService } from './../../api/services/user.service';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;

  constructor(
    private readonly userService: UserService,
    private readonly healthService: HealthService,
    private readonly http: HttpClient
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }

  public isUserLoggedIn(): boolean {
    return this.user?.authenticated;
  }

  public authenticateCurrentUser(): Observable<boolean> {
    const username = this.user.username;
    const userExists = this.userService.getUserExists({ username });
    userExists.subscribe(exists => {
      console.log('login in auth service');
      if (exists) {
        this.user.authenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.removeItem('user');
      }
    }, error => {
      this.user = null;
      localStorage.removeItem('user');
    });
    return userExists;
  }

  public login(username: string, password: string): Observable<boolean> {
    this.user = new User(
      username, password, window.btoa(`${username}:${password}`)
    );
    return this.authenticateCurrentUser();
  }

}
