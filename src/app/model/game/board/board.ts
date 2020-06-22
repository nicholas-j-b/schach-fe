import { Square } from './square';
import { HighlightType } from './../../../view/board/highlight-type.enum';
import { MoveCollection } from './../move-collection';
import { FunReturn } from './../../fun-return.enum';
import { BoardPosition } from './../position/board-position';
import { AbsolutePosition } from './../position/absolute-position';
import { ClickStore } from './../service/click-store';
import { Move } from './../move';
import { MessageSocketService } from './../../../service/socket/message-socket.service';
import { Piece } from '../piece';
import { GameAssets } from '../game-assets';

export class Board {
    static readonly assetBasePath = '/assets/images/';

    boardSquares: Square[][];
    pieces: Piece[];
    legalMoves: MoveCollection[];
    actions = {
        [FunReturn.SELECT_PIECE_FOR_MOVING]: this.selectPieceForMoving,
        [FunReturn.MOVE]: this.move,
        [FunReturn.DESELECT_PIECE]: this.deselectPiece,
        [FunReturn.DO_NOTHING]: (b: BoardPosition) => {}
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
        this.messageService.$legalMovesMessage.subscribe((moves: MoveCollection[]) => {
            console.log('initialise the move');
            console.log(moves);
            this.legalMoves = moves;
            this.clickStore.setLegalMoves(moves);
        });
        this.canvas.addEventListener('click', e => this.onClick(e), false);
    }

    private onClick(e: MouseEvent) {
        const boardPosition = BoardPosition.getBoardPositionfromAbsolutePosition(
            new AbsolutePosition(e.offsetX, e.offsetY)
        );
        console.log(boardPosition);
        const action = this.clickStore.onClick(boardPosition);
        this.actions[action](boardPosition, this);
    }

    private selectPieceForMoving(boardPosition: BoardPosition, that: this) {
        console.log('select piece');
        const moves = that.legalMoves.find((move) => {
            return boardPosition.equals(move.from);
        });
        that.highlight([moves.from], HighlightType.SELECTED_FOR_MOVING, that);
        that.highlight(moves.to.map(it => it.to), HighlightType.POSSIBLE_MOVE_SQUARE, that);
    }

    private highlight(boardPositions: BoardPosition[], highlightType: HighlightType, that: this) {
        boardPositions.forEach((boardPosition: BoardPosition) => {
            that.boardSquares[boardPosition.y][boardPosition.x].setHighlight(highlightType);
        });
    }

    private move(boardPosition: BoardPosition, that: this) {
        console.log('move');
        const from = that.clickStore.getSelectedPiece();
        that.messageService.sendMove(new Move(from, boardPosition));
        that.unhighlightAll(that);
    }

    private deselectPiece(boardPosition: BoardPosition, that: this) {
        console.log('deselect');
        that.unhighlightAll(that);
    }

    private unhighlightAll(that: this) {
        for (const row of this.boardSquares) {
            for (const square of row) {
                square.setUnhighlighted();
            }
        }
    }

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
