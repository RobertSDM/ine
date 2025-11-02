import type Item from "./items/item";
import Vec2D from "./vector";

export default class Whiteboard {
    private items: Array<Item>;
    private origin: Vec2D;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.items = [];
        this.origin = new Vec2D(0, 0);
    }

    public addItem(item: Item) {
        this.items.push(item);
    }

    public itemsInside(vec: Vec2D, w: number, h: number): Item[] {
        return this.items.filter((item) => item.isInside(vec, w, h));
    }

    public getContext() {
        return this.ctx;
    }
}
