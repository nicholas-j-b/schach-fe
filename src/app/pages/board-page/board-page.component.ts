import { Game } from './../../model/game/game';
import { InitialMessage } from './../../model/message/initial-message';
import { ConnectionService } from './../../service/api/connection.service';
import { MessageSocketService } from './../../service/socket/message-socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  private game: Game;

  constructor(
    private readonly messageService: MessageSocketService,
    private readonly connectionService: ConnectionService,
    private readonly route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const create = params['create'];
      this.game = new Game(this.messageService, this.connectionService, create);
    });
  }

}
