import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from './../model/game/game';
import { GameStoreService } from './../store/game-store.service';
import { InitialMessage } from './../model/message/initial-message';
import { ConnectionService } from './api/connection.service';
import { MessageSocketService } from './socket/message-socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _gameId = new BehaviorSubject<string>(null);
  public $gameId = this._gameId.asObservable();

  constructor(
    private readonly messageService: MessageSocketService,
    private readonly connectionService: ConnectionService,
    private readonly gameStore: GameStoreService
  ) { }

  public createGame(): Observable<string> {
    this.connectionService.createGame().subscribe((initialMessage: InitialMessage) => {
      this.initialiseGame(initialMessage);
    });
    return this.$gameId;
  }

  public joinGame(gameId: string) {
    this.connectionService.joinGame(gameId).subscribe((initialMessage: InitialMessage) => {
      this.initialiseGame(initialMessage);
    });
  }

  private initialiseGame(initialMessage: InitialMessage) {
    const game = new Game(this.messageService, initialMessage.gameId);
    this.gameStore.addGame(game);
    this._gameId.next(game.gameId);
    this.messageService.initialise(initialMessage);
  }
}
