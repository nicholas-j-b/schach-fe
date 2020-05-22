export class Board {
    // onClick(x, y) {
    //     const pos = this.getSquareFromClick(x, y);
    //     return pos;
    // }

    // updateHighlightedSquares(pos) {
    //     this.boardSquares[pos.y][pos.x].setHighlighted();
    // }

    // getSquareFromClick(x, y) {
    //     return {
    //         x: Math.floor(x / Config.BOARD.SQUARE_WIDTH), 
    //         y: Math.floor(y / Config.BOARD.SQUARE_HEIGHT)
    //     };
    // }

    // checkMoveLegalFrom(pos, colour) {
    //     if (this.squares[pos.x][pos.y]?.colour === colour) {
    //         this.updateHighlightedSquares(pos);
    //         return true;
    //     };
    // }

    // checkMoveLegalTo(pos, colour) {
    //     return true;
    // }

    // checkMoveLegality(move) {
    //     return true;
    // }

    // move(move) {
    //     if (this.checkMoveLegality(move)) {
    //         const piece = this.squares[move.from.x][move.from.y];
    //         this.squares[move.from.x][move.from.y] = null;
    //         piece.move(move.to);
    //         this.squares[move.to.x][move.to.y] = piece;
    //         this.setAllSquaresUnhighlighted();
    //     }
    // }

    // setAllSquaresUnhighlighted() {
    //     for (let row of this.boardSquares) {
    //         for (let square of row) {
    //             square.setUnhighlighted();
    //         }
    //     }
    // }

    // update() {

    // }

    draw() {
        this.drawSquares();
    }

    drawSquares() {
        for (let row of this.boardSquares) {
            for (let square of row) {
                square.draw();
            }
        }
    }
}
