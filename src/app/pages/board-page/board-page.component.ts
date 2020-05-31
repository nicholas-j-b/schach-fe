import { GameStoreService } from './../../store/game-store.service';
import { Game } from './../../model/game/game';
import { InitialMessage } from './../../model/message/initial-message';
import { ConnectionService } from './../../service/api/connection.service';
import { MessageSocketService } from './../../service/socket/message-socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  private game: Game;

  constructor(
    private readonly gameStore: GameStoreService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameObservable = this.gameStore.getGame(params.gameId);
      gameObservable.subscribe((game: Game) => {
        if (game !== null) {
          this.game = game;
          this.game.initialiseCanvas();
        }
      });
    });
  }

}
