import { environment } from './../../../environments/environment';
import { InitialMessage } from './../../model/message/initial-message';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private readonly _connectionSocketInitialMessage = new BehaviorSubject<InitialMessage>(null);
  public readonly $connectionSocketInitialMessage = this._connectionSocketInitialMessage.asObservable();


  constructor(
    private readonly http: HttpClient
  ) {
    this.$connectionSocketInitialMessage.subscribe((val) => {
      if (val) {
        console.log(val);
      }
    });
  }

  public createGame(): Observable<InitialMessage> {
    return this.http.get(environment.baseUrl + 'game/create') as Observable<InitialMessage>;
  }

  public joinGame(gameId: string): Observable<InitialMessage> {
    return this.http.get(environment.baseUrl + `game/join/${gameId}`) as Observable<InitialMessage>;
  }
}
