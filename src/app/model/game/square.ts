export class Square {
    x: number;
    y: number;
    xSize: number;
    ySize: number;
    ogColour;
    colour;

    constructor(x, y, xSize, ySize, colour) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        // this.ogColour = Config.DRAW_COLOURS[Config.COLOUR_NAMES[colour]];
        // this.colour = Config.DRAW_COLOURS[Config.COLOUR_NAMES[colour]];
        // this.highlighted = false;
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
        Context.ctx.fillStyle = this.colour;
        Context.ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
    }
}
