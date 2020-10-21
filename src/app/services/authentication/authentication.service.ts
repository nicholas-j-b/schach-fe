import { HttpClient } from '@angular/common/http';
import { HealthService } from './../../api/services/health.service';
import { UserService } from './../../api/services/user.service';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { StrictHttpResponse } from 'src/app/api/strict-http-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private _userSubject: BehaviorSubject<User>;
  // private $user: Observable<User>;

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

  public login(username: string, password: string): Observable<StrictHttpResponse<boolean>> {
    this.user = new User(
      username, password, window.btoa(`${username}:${password}`)
    );
    const res = this.userService.getUserExists$Response({ username })
    res.subscribe(res => {
      console.log('login in auth service');
      if (res.body) {
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
    return res;
  }

}
