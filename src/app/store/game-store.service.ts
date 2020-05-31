import { Observable, of, BehaviorSubject } from 'rxjs';
import { Game } from './../model/game/game';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private games = new Map<string, BehaviorSubject<Game>>();

  public addGame(game: Game) {
    console.log(this);
    console.log(game);
    if (this.games.has(game.gameId)) {
      this.games.get(game.gameId).next(game);
    } else {
      this.games.set(game.gameId, new BehaviorSubject(game));
    }
  }

  public getGame(gameId: string): Observable<Game> {
    if (!this.games.has(gameId)) {
      this.games.set(gameId, new BehaviorSubject(null));
    }
    return this.games.get(gameId).asObservable();
  }

  public deleteGame(gameId: string) {
    this.games.delete(gameId);
  }
}
