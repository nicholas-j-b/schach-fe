export class GameConfig {
    static readonly CANVAS_WIDTH = 800;
    static readonly CANVAS_HEIGHT = 800;
    static readonly ANIMATION = {
        fps: 30
    }
    static readonly DRAW_COLOURS = {
        background: 'rgb(247, 220, 111)',
        white: 'rgb(237, 230, 221)',
        black: 'rgb(78, 135, 110)',
        select: 'rgb(118, 135, 180)',
        potential: 'rgb(178, 235, 180)',
    };
    static readonly PIECE = {
        X_SIZE: 30,
        Y_SIZE: 30
    }
    static readonly BOARD = {
        SQUARE_HEIGHT: GameConfig.CANVAS_HEIGHT / 8,
        SQUARE_WIDTH: GameConfig.CANVAS_WIDTH / 8
    }
    static readonly COLOURS = {
       BLACK: 0,
       WHITE: 1,
       SELECT: 2,
       POTENTIAL: 3,
    };
    static readonly CHESS_COLOURS = {
       BLACK: 0,
       WHITE: 1
    }
    static readonly COLOUR_NAMES = [
        'black', 
        'white',
        'select',
        'potential'
    ];
}