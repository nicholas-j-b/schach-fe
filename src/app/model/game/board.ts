import { Piece } from './piece';
import { Position } from './position';
import { GameAssets } from './game-assets';

export class Board {
    static readonly assetBasePath = '/assets/images/';

    boardSquares;
    pieces: Piece[];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D
    ) {

    }
    // onClick(x, y) {
    //     const pos = this.getSquareFromClick(x, y);
    //     return pos;
    // }

    // updateHighlightedSquares(pos) {
    //     this.boardSquares[pos.y][pos.x].setHighlighted();
    // }

    // getSquareFromClick(x, y) {
    //     return {
    //         x: Math.floor(x / Config.BOARD.SQUARE_WIDTH), 
    //         y: Math.floor(y / Config.BOARD.SQUARE_HEIGHT)
    //     };
    // }

    // checkMoveLegalFrom(pos, colour) {
    //     if (this.squares[pos.x][pos.y]?.colour === colour) {
    //         this.updateHighlightedSquares(pos);
    //         return true;
    //     };
    // }

    // checkMoveLegalTo(pos, colour) {
    //     return true;
    // }

    // checkMoveLegality(move) {
    //     return true;
    // }

    // move(move) {
    //     if (this.checkMoveLegality(move)) {
    //         const piece = this.squares[move.from.x][move.from.y];
    //         this.squares[move.from.x][move.from.y] = null;
    //         piece.move(move.to);
    //         this.squares[move.to.x][move.to.y] = piece;
    //         this.setAllSquaresUnhighlighted();
    //     }
    // }

    // setAllSquaresUnhighlighted() {
    //     for (let row of this.boardSquares) {
    //         for (let square of row) {
    //             square.setUnhighlighted();
    //         }
    //     }
    // }

    // update() {

    // }

    public draw() {
        this.clearBoard();
        this.drawSquares();
        this.drawPieces();
    }

    private clearBoard() {
        this.ctx.fillStyle = 'rgb(30, 30, 30)';
        this.ctx.fillRect(0, 0, 800, 800);
    }

    private drawSquares() {
        for (const row of this.boardSquares) {
            for (const square of row) {
                square.draw();
            }
        }
    }
    private drawPieces() {
        GameAssets.readInImages(this.pieces);
        for (const piece of this.pieces) {
            const xy = Position.getAbsolutePosition(piece.position.x, piece.position.y);
            this.ctx.drawImage(
                GameAssets.images.get(piece.colour + piece.pieceName),
                xy.x,
                xy.y
            );
        }
    }
}
