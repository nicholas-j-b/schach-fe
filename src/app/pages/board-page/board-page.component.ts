import { InitialMessage } from './../../model/message/initial-message';
import { ConnectionService } from './../../service/api/connection.service';
import { MessageSocketService } from './../../service/socket/message-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  constructor(
    private readonly messageService: MessageSocketService,
    private readonly connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.connectionService.$connectionSocketInitialMessage.subscribe((vals: InitialMessage) => {
      if (vals) {
        this.messageService.initialise(vals);
        const that = this;
        setTimeout(() => {
          that.messageService.sendMessage('hello');
        }, 3000);
      }
    });
    this.connectionService.requestNewConnection();
  }

}
