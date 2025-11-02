import type Vec2D from "../vector";
import type View from "../view";

export default interface Item {
    draw(
        ctx: CanvasRenderingContext2D,
        view: View,
        highlighted?: boolean
    ): void;
    move(vec: Vec2D): void;
    hovered(vec: Vec2D): boolean;
    isInside(vec: Vec2D, w: number, h: number): boolean;
    getWidth(): number;
    getHeight(): number;
    get posVec(): Vec2D;
}
