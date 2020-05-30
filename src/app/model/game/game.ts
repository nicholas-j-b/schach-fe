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

export class Game {
    private readonly canvas = document.getElementById("schachCanvas") as HTMLCanvasElement;
    private readonly ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    private readonly timer = new GameTimer();

    public board: Board; // maybe private?

    constructor(
        private readonly messageService: MessageSocketService,
        private readonly connectionService: ConnectionService,
        private readonly create: string
    ) {
        this.requestConnection(create);
        this.openConnection();
        this.board = BoardFactory.wire(this.canvas, this.ctx, this.messageService);
        this.board.draw();
        this.timer.start(this.board, this.update);
    }

    private requestConnection(create: string) {
        if (create === 'create') {
            this.connectionService.createGame();
        }
        else {
            this.connectionService.joinGame();
        }
    }

    public update(board) {
        board.draw();
    }

    private openConnection(){
        this.connectionService.$connectionSocketInitialMessage.subscribe((vals: InitialMessage) => {
            if (vals) {
                this.messageService.initialise(vals);
            }
        });
    }

}
