import { MovementService } from './../service/movement-service';
import { BoardColour } from './../../../view/board/board-colour.enum';
import { MessageSocketService } from './../../../service/socket/message-socket.service';
import { Square } from './square';
import { GameConfig } from '../game-config';
import { Board } from './board';
import { BehaviorSubject, Observable } from 'rxjs';
import { Piece } from '../piece';
import { ClickStore } from '../service/click-store';
export class BoardFactory {

    public static wire(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        messageService: MessageSocketService,
        movementService: MovementService
        ) {
        const board = new Board(canvas, ctx, messageService, movementService);
        board.boardSquares = BoardFactory.initialiseSquares(canvas, ctx);
        return board;
    }

    private static initialiseSquares(canvas, ctx) {
        const squares = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                let colour;
                if ((i + j) % 2 === 0) {
                    colour = BoardColour.whiteSquare;
                } else {
                    colour = BoardColour.blackSquare;
                }
                const square = new Square(
                    GameConfig.BOARD.SQUARE_WIDTH * j,
                    GameConfig.BOARD.SQUARE_HEIGHT * i,
                    GameConfig.BOARD.SQUARE_WIDTH,
                    GameConfig.BOARD.SQUARE_HEIGHT,
                    colour,
                    canvas,
                    ctx
                );
                row.push(square);
            }
            squares.push(row);
        }
        return squares;
    }
}
