import { MoveCollection } from './../move-collection';
import { FunReturn } from './../../fun-return.enum';
import { ClickState } from './../click-state';
import { Move } from './../move';
import { BoardPosition } from '../position/board-position';

export class ClickStore {
    private clickState = ClickState.DEFAULT;
    private legalMoves: MoveCollection[];
    private selectedPiece: BoardPosition;

    public onClick(boardPosition: BoardPosition): FunReturn {
        switch (this.clickState) {
            case ClickState.DEFAULT: {
                if (this.legalPieceSelection(boardPosition)) {
                    this.selectedPiece = boardPosition;
                    this.clickState = ClickState.SELECTED_TO_MOVE;
                    return FunReturn.SELECT_PIECE_FOR_MOVING;
                }
                return FunReturn.DO_NOTHING;
            }
            case ClickState.SELECTED_TO_MOVE: {
                if (this.legalPieceMove(boardPosition)) {
                    this.clickState = ClickState.DEFAULT;
                    return FunReturn.MOVE;
                }
                this.clickState = ClickState.DEFAULT;
                return FunReturn.DESELECT_PIECE;
            }
            default: {
                return FunReturn.DO_NOTHING;
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
            return this.selectedPiece.equals(move.from) && move.to.some((pos) => {
                return boardPosition.equals(pos);
            });
        });
    }

    public getSelectedPiece() {
        return this.selectedPiece;
    }

    public setLegalMoves(moves: MoveCollection[]) {
        this.legalMoves = moves;
    }
}
