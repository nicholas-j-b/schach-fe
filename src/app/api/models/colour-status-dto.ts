/* tslint:disable */
import { PieceDto } from './piece-dto';
export interface ColourStatusDto {
  canCastleKingSide?: boolean;
  canCastleQueenSide?: boolean;
  pieces?: Array<PieceDto>;
}
