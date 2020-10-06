/* tslint:disable */
import { PieceName } from './piece-name';
import { PositionDto } from './position-dto';
export interface MoveDto {
  from?: PositionDto;
  promoteTo?: PieceName;
  takenPiece?: PositionDto;
  to?: PositionDto;
}
