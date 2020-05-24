import { GameConfig } from './game-config';
export class Square {
    x: number;
    y: number;
    xSize: number;
    ySize: number;
    ogColour;
    colour;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(x, y, xSize, ySize, colour, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.canvas = canvas;
        this.ctx = ctx;
        this.ogColour = GameConfig.DRAW_COLOURS[GameConfig.COLOUR_NAMES[colour]];
        this.colour = GameConfig.DRAW_COLOURS[GameConfig.COLOUR_NAMES[colour]];
        //this.highlighted = false;
    }

    // setUnhighlighted() {
    //     this.highlighted = false;
    //     this.colour = this.ogColour;
    // }

    // setHighlighted() {
    //     if (this.highlighted) {
    //         this.colour = this.ogColour;
    //     } else {
    //         this.colour = Config.DRAW_COLOURS[Config.COLOUR_NAMES[Config.COLOURS.SELECT]];
    //     }
    //     this.highlighted = !this.highlighted;
    // }

    draw() {
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
    }
}
