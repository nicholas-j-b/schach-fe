import { BoardPosition } from './../position/board-position';
import { AbsolutePosition } from './../position/absolute-position';
import { ClickStore } from './../service/click-store';
import { Move } from './../move';
import { MessageSocketService } from './../../../service/socket/message-socket.service';
import { Piece } from '../piece';
import { GameAssets } from '../game-assets';

export class Board {
    static readonly assetBasePath = '/assets/images/';

    boardSquares;
    pieces: Piece[];
    legalMoves: Move[];
    actions = {
        selectPieceForMoving: this.selectPieceForMoving,
        move: this.move,
        deselectPiece: this.deselectPiece,
        doNothing: (b: BoardPosition) => {}
    };
    clickStore: ClickStore = new ClickStore();

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
        private readonly messageService: MessageSocketService
    ) {
        this.initialiseUpdates();
    }

    public initialiseUpdates() {
        this.messageService.$pieceMessage.subscribe((pieces: Piece[]) => {
            this.pieces = pieces;
        });
        this.messageService.$legalMovesMessage.subscribe((moves: Move[]) => {
            console.log('initialise the move');
            console.log(moves);
            this.legalMoves = moves;
            this.clickStore.setLegalMoves(moves);
        });
        this.canvas.addEventListener('click', e => this.onClick(e), false);
    }

    private onClick(e) {
        const boardPosition = BoardPosition.getBoardPositionfromAbsolutePosition(
            new AbsolutePosition(e.offsetX, e.offsetY)
        );
        console.log(boardPosition);
        const action = this.clickStore.onClick(boardPosition);
        this.actions[action](boardPosition, this);
    }

    private selectPieceForMoving(boardPosition: BoardPosition) {
        console.log('select piece');
    }

    private move(boardPosition: BoardPosition, that: this) {
        console.log('move');
        const from = that.clickStore.getSelectedPiece();
        that.messageService.sendMove(new Move(from, boardPosition));
    }

    private deselectPiece(boardPosition: BoardPosition) {
        console.log('deselect');
    }

    // updateHighlightedSquares(pos) {
    //     this.boardSquares[pos.y][pos.x].setHighlighted();
    // }

    // checkMoveLegalFrom(pos, colour) {
    //     if (this.squares[pos.x][pos.y]?.colour === colour) {
    //         this.updateHighlightedSquares(pos);
    //         return true;
    //     };
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
            const drawPosition = AbsolutePosition.getDrawPositionfromBoardPosition(piece.position);
            this.ctx.drawImage(
                GameAssets.images.get(piece.colour + piece.pieceName),
                drawPosition.x,
                drawPosition.y
            );
        }
    }
}
