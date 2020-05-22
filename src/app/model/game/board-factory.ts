export class BoardFactory {
    constructor() {
        this.board = new Board();
        this.board.boardSquares = this.initialiseSquares();
        this.board.pieceState = new Array();
        return this.board;
    }

    initialiseSquares() {
        const squares = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                let colour;
                if ((i + j) % 2 == 0) {
                    colour = Config.COLOURS.WHITE;
                } else {
                    colour = Config.COLOURS.BLACK;
                }
                let square = new Square(
                    Config.BOARD.SQUARE_WIDTH * j, 
                    Config.BOARD.SQUARE_HEIGHT * i, 
                    Config.BOARD.SQUARE_WIDTH, 
                    Config.BOARD.SQUARE_HEIGHT,
                    colour
                )
                row.push(square);
            }
            squares.push(row);
        }
        return squares;
    }
}
