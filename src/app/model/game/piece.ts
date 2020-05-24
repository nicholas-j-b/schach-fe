import { Position } from './position';
import { Colour } from '../colour.enum';

export class Piece {
    colour: Colour;
    id: string;
    pieceName: string;
    position: Position;
}
