import type Vec2D from "../vector";
import type View from "../view";
import type Item from "./item";

export default class RectangleItem implements Item {
    private BASE_COLOR = "white";
    private HIGHLIGHT_COLOR = "red";

    constructor(private vec: Vec2D, private w: number, private h: number) {}

    public draw(
        ctx: CanvasRenderingContext2D,
        view: View,
        highlighted: boolean = false
    ): void {
        ctx.strokeStyle = this.BASE_COLOR;

        if (highlighted) ctx.strokeStyle = this.HIGHLIGHT_COLOR;

        const vecRelativeToView = this.vec.subtractVec(view.posVec);

        ctx.beginPath();
        ctx.strokeRect(
            vecRelativeToView.x,
            vecRelativeToView.y,
            this.w,
            this.h
        );
        ctx.stroke();
        ctx.closePath();
    }

    public hovered(vec: Vec2D): boolean {
        return (
            vec.x >= this.vec.x &&
            vec.x <= this.vec.x + this.w &&
            vec.y >= this.vec.y &&
            vec.y <= this.vec.y + this.h
        );
    }

    public move(): void {}

    public isInside(vec: Vec2D, w: number, h: number): boolean {
        return (
            this.vec.x <= vec.x + w &&
            this.vec.x + this.w >= vec.x &&
            this.vec.y <= vec.y + h &&
            this.vec.y + this.h >= vec.y
        );
    }

    public getWidth(): number {
        return this.w;
    }

    public getHeight(): number {
        return this.h;
    }

    get posVec() {
        return this.vec;
    }
}
