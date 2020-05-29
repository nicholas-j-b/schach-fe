import { ClickState } from './../click-state';
import { Move } from './../move';
import { BoardPosition } from '../position/board-position';

export class ClickStore {
    private clickState = ClickState.DEFAULT;
    private legalMoves: Move[];
    private selectedPiece: BoardPosition;

    public onClick(boardPosition: BoardPosition): string {
        switch (this.clickState) {
            case ClickState.DEFAULT: {
                if (this.legalPieceSelection(boardPosition)) {
                    this.selectedPiece = boardPosition;
                    this.clickState = ClickState.SELECTED_TO_MOVE;
                    return 'selectPieceForMoving';
                }
                return 'doNothing';
            }
            case ClickState.SELECTED_TO_MOVE: {
                if (this.legalPieceMove(boardPosition)) {
                    this.clickState = ClickState.DEFAULT;
                    return 'move';
                }
                this.clickState = ClickState.DEFAULT;
                return 'deselectPiece';
            }
            default: {
                return 'doNothing';
            }
        }
    }

    private legalPieceSelection(boardPosition: BoardPosition) {
        return this.legalMoves.some((move) => {
            return boardPosition.equals(move.from);
        });
    }

    private legalPieceMove(boardPosition: BoardPosition) {
        return this.legalMoves.some((move) => {
            return this.selectedPiece.equals(move.from) && boardPosition.equals(move.to);
        });
    }

    public getSelectedPiece() {
        return this.selectedPiece;
    }

    public setLegalMoves(moves: Move[]) {
        this.legalMoves = moves;
    }
}
