import { GameTimer } from './game-timer';
import { Piece } from './piece';
import { BoardFactory } from './board/board-factory';
import { Board } from './board/board';
import { PieceMessage } from './../message/piece-message';
import { InitialMessage } from './../message/initial-message';
import { ConnectionService } from './../../service/api/connection.service';
import { MessageSocketService } from './../../service/socket/message-socket.service';
import { Injectable } from '@angular/core';
import { GameAssets } from './game-assets';

@Injectable({
  providedIn: 'root'
})
export class Game {
    private readonly canvas = document.getElementById("schachCanvas") as HTMLCanvasElement;
    private readonly ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    private readonly timer = new GameTimer();

    board: Board;

    constructor(
        private readonly messageService: MessageSocketService,
        private readonly connectionService: ConnectionService
    ) {
        this.openConnection();
        this.board = BoardFactory.wire(this.canvas, this.ctx, this.messageService);
        this.board.draw();
        this.timer.start(this.board, this.update);
    }

    public update(board) {
        board.draw();
    }

    private openConnection(){
        this.connectionService.requestNewConnection();
        this.connectionService.$connectionSocketInitialMessage.subscribe((vals: InitialMessage) => {
            if (vals) {
                this.messageService.initialise(vals);
            }
        });
    }

}
