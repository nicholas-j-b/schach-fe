import { BoardPosition } from './board-position';
import { GameConfig } from '../game-config';

export class AbsolutePosition {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // returns the top left corner of where the piece should be drawn
    public static getDrawPositionfromBoardPosition(boardPosition: BoardPosition): AbsolutePosition {
        return new AbsolutePosition(
            AbsolutePosition.getAbsoluteX(boardPosition.x),
            AbsolutePosition.getAbsoluteY(boardPosition.y)
        );
    }

    private static getAbsoluteX(boardPositionX): number {
        return AbsolutePosition.calculateAbsolute(GameConfig.BOARD.SQUARE_WIDTH, boardPositionX, GameConfig.PIECE.X_SIZE);
    }

    private static getAbsoluteY(boardPositionY): number {
        return AbsolutePosition.calculateAbsolute(GameConfig.BOARD.SQUARE_HEIGHT, boardPositionY, GameConfig.PIECE.Y_SIZE);
    }

    private static calculateAbsolute(stepSize, position, pieceSize): number {
        const startEdge = 0;
        const firstPoint = stepSize / 2;
        return position * stepSize + firstPoint + startEdge - pieceSize;
    }
}
