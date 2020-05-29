import { GameConfig } from './../game-config';
import { AbsolutePosition } from './absolute-position';

export class BoardPosition {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public static getBoardPositionfromAbsolutePosition(absoultePosition: AbsolutePosition): BoardPosition {
        return new BoardPosition(
            BoardPosition.getRelativeX(absoultePosition.x),
            BoardPosition.getRelativeY(absoultePosition.y)
        );
    }

    private static getRelativeX(boardPositionX): number {
        return BoardPosition.calculateRelative(GameConfig.BOARD.SQUARE_WIDTH, boardPositionX, GameConfig.PIECE.X_SIZE);
    }

    private static getRelativeY(boardPositionY): number {
        return BoardPosition.calculateRelative(GameConfig.BOARD.SQUARE_HEIGHT, boardPositionY, GameConfig.PIECE.Y_SIZE);
    }

    private static calculateRelative(stepSize, position, pieceSize): number {
        const startEdge = 0;
        return Math.floor((position - startEdge) / stepSize);
    }

    public equals(other: BoardPosition): boolean {
        return this.x === other.x && this.y === other.y;
    }

}
