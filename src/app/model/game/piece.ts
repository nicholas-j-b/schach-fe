import { BoardPosition } from './position/board-position';
import { Colour } from '../colour.enum';

export class Piece {
    colour: Colour;
    id: string;
    pieceName: string;
    position: BoardPosition;
}
