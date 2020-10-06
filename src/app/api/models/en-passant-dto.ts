/* tslint:disable */
import { PositionDto } from './position-dto';
export interface EnPassantDto {
  possible?: boolean;
  taken?: PositionDto;
}
