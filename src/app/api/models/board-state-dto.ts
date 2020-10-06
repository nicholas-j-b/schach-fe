/* tslint:disable */
import { Colour } from './colour';
import { ColourStatusDto } from './colour-status-dto';
import { EnPassantDto } from './en-passant-dto';
export interface BoardStateDto {
  blackStatus?: ColourStatusDto;
  enPassant?: EnPassantDto;
  turn?: Colour;
  whiteStatus?: ColourStatusDto;
}
