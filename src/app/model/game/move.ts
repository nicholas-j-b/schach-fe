import { BoardPosition } from './position/board-position';

export class Move {
    from: BoardPosition;
    to: BoardPosition;

    constructor(from: BoardPosition, to: BoardPosition) {
        this.from = from;
        this.to = to;
    }
}
