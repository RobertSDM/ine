import type View from "../view";
import type Item from "./item";

export default class RectangleItem implements Item {
    private BASE_COLOR = "white";
    private HIGHLIGHT_COLOR = "red";

    constructor(
        private x: number,
        private y: number,
        private w: number,
        private h: number
    ) {}

    public draw(
        ctx: CanvasRenderingContext2D,
        view: View,
        highlighted: boolean = false
    ): void {
        ctx.strokeStyle = this.BASE_COLOR;

        if (highlighted) ctx.strokeStyle = this.HIGHLIGHT_COLOR;

        ctx.beginPath();
        ctx.strokeRect(
            view.getX() - this.x,
            view.getY() - this.y,
            this.w,
            this.h
        );
        ctx.stroke();
        ctx.closePath();
    }

    public hovered(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.w &&
            y >= this.y &&
            y <= this.y + this.h
        );
    }

    public move(): void {}

    public isInside(x: number, y: number, w: number, h: number): boolean {
        // console.log(this.x, x);
        
        return (
            this.x >= x
            // && this.x <= x + w && this.y >= y && this.y <= y + h
            // (this.x + this.w <= x && this.y + this.h <= y)
        );
    }

    public getWidth(): number {
        return this.w;
    }

    public getHeight(): number {
        return this.h;
    }
}
