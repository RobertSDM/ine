import type View from "../view";

export default interface Item {
    draw(
        ctx: CanvasRenderingContext2D,
        view: View,
        highlighted?: boolean
    ): void;
    move(x: number, y: number): void;
    hovered(x: number, y: number): boolean;
    isInside(x: number, y: number, w: number, h: number): boolean;
    getWidth(): number;
    getHeight(): number;
}
