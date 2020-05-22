export class Position {
    static getAbsolutePosition(x, y) {
        return [
            Position.getAbsoluteX(x),
            Position.getAbsoluteY(y)
        ]
    }

    static getAbsoluteX(boardPositionX) {
        return Position.calculateAbsolute(Config.BOARD.SQUARE_WIDTH, boardPositionX, Config.PIECE.X_SIZE);
        
    }
    static getAbsoluteY(boardPositionY) {
        return Position.calculateAbsolute(Config.BOARD.SQUARE_HEIGHT, boardPositionY, Config.PIECE.Y_SIZE);
    }

    static calculateAbsolute(stepSize, position, pieceSize) {
        const startEdge = 0;
        const firstPoint = stepSize / 2;
        return position * stepSize + firstPoint + startEdge - pieceSize;
    }
}
