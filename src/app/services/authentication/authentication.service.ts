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
  // private _userSubject: BehaviorSubject<User>;
  // private $user: Observable<User>;

  public user: User;


  constructor(
    private readonly userService: UserService,
    private readonly healthService: HealthService,
    private readonly http: HttpClient
  ) {
    // this._userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
    // this.$user = this._userSubject.asObservable();
    // this.$user.subscribe(user => {
    // this.user = user;
    // });
  }

  // public get user(): User {
  //   return this.user;
  // }

  // public set user(user: User) {
  //   this._user = user;
  // }

  public login(username: string, password: string) {
    this.user = new User(
      username, password, window.btoa(`${username}:${password}`)
    );
    return this.userService.getUserExists$Response({ username }).subscribe(res => {
      console.log('login in auth service');
      if (res.body) {
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.removeItem('user');
      }
    }, error => {
        this.user = null;
        localStorage.removeItem('user');
    }
    );
  }

}
