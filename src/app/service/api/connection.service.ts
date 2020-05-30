import { InitialMessage } from './../../model/message/initial-message';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    this._connectionSocketInitialMessage.subscribe((val) => {
      if (val) {
        console.log(val);
      }
    });
  }

  public createGame() {
    this.http.get('http://localhost:9901/api/game/create').subscribe((res: InitialMessage) => {
      this._connectionSocketInitialMessage.next(res);
    });
  }

  public joinGame() {
    this.http.get('http://localhost:9901/api/game/join').subscribe((res: InitialMessage) => {
      this._connectionSocketInitialMessage.next(res);
    });
  }
}
