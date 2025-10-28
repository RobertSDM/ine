import type Item from "./items/item";
import RectangleItem from "./items/rectangleItem";

export default class Whiteboard {
    private items: Array<Item> = [];
    private width: number = 4000;
    private height: number = 4000;

    constructor(private ctx: CanvasRenderingContext2D) {}

    public createRectangle(x: number, y: number, w: number, h: number) {
        this.items.push(new RectangleItem(x, y, w, h));
    }

    public itemsInsideRange(
        x: number,
        y: number,
        w: number,
        h: number
    ): Item[] {
        return this.items.filter((item) => item.isInside(x, y, w, h));
    }

    public getContext() {
        return this.ctx;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }
}
