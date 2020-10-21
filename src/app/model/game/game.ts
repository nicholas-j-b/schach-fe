import { MovementService } from './service/movement-service';
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
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private timer: GameTimer;

    private board: Board;

    constructor(
        private readonly messageService: MessageSocketService,
        private readonly movementService: MovementService,
        public readonly gameId: string,
    ) {
    }

    public initialiseCanvas() {
        this.canvas = document.getElementById("schachCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.timer = new GameTimer();
        this.board = BoardFactory.wire(
            this.canvas,
            this.ctx,
            this.messageService, 
            this.movementService);
        this.board.draw();
        this.timer.start(this.board, this.update);
    }

    public update(board) {
        board.draw();
    }


}
