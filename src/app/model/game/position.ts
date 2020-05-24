import { GameConfig } from './game-config';
export class Position {
    x: number;
    y: number;

    public static getAbsolutePosition(x: number, y: number) {
        return {
            x: Position.getAbsoluteX(x),
            y: Position.getAbsoluteY(y)
        };
    }

    private static getAbsoluteX(boardPositionX) {
        return Position.calculateAbsolute(GameConfig.BOARD.SQUARE_WIDTH, boardPositionX, GameConfig.PIECE.X_SIZE);
    }

    private static getAbsoluteY(boardPositionY) {
        return Position.calculateAbsolute(GameConfig.BOARD.SQUARE_HEIGHT, boardPositionY, GameConfig.PIECE.Y_SIZE);
    }

    private static calculateAbsolute(stepSize, position, pieceSize) {
        const startEdge = 0;
        const firstPoint = stepSize / 2;
        return position * stepSize + firstPoint + startEdge - pieceSize;
    }
}
