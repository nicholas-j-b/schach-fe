import { MoveCollection } from './../move-collection';
import { MoveDestination } from './../position/move-destination';
import { BoardPosition } from './../position/board-position';
import { Move } from './../move';

export class MovementService {
    public getMove(from: BoardPosition, to: BoardPosition, legalMoves: MoveCollection[]) {
        if (this.isPawnPromotion(from, to, legalMoves)) {
            
        }
        return new Move(from, to);
    }

    // can be converted into getAuxillaryMoveInfo() #agile
    public isPawnPromotion(from: BoardPosition, to: BoardPosition, legalMoves: MoveCollection[]): boolean {
        const movementCollection = legalMoves.find(it => {
            return it.from.equals(from);
        });
        const moveTo = movementCollection.to.find(it => {
            return it.to.equals(to);
        });
        return moveTo.isPawnPromotion;
    }
}
