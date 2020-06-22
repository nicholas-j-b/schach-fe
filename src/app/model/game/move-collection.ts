import { MoveDestination } from './position/move-destination';
import { BoardPosition } from './position/board-position';
export class MoveCollection {
    from: BoardPosition;
    to: MoveDestination[];
}
