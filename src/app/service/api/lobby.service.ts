import { HttpClient } from '@angular/common/http';
import { GameInfoDto } from './../../model/api/game-info-dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private readonly _activeGames = new BehaviorSubject<GameInfoDto[]>(null);
  public readonly $activeGames = this._activeGames.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  public getActiveGames() {
    this.http.get('http://localhost:9901/api/lobby/games').subscribe((gameInfoDtos: GameInfoDto[]) => {
      this._activeGames.next(gameInfoDtos);
    });
  }
}
