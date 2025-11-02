import type Item from "./items/item";
import Vec2D from "./vector";
import type Whiteboard from "./whiteboard";

export default class View {
    private _posVec: Vec2D;

    private _isDragged: boolean;
    private lastPosition: Vec2D;

    constructor(
        private whiteboard: Whiteboard,
        private width: number,
        private height: number
    ) {
        this._isDragged = false;
        this._posVec = new Vec2D(0, 0).subtract(
            Math.floor(this.width / 2),
            Math.floor(this.height / 2)
        );
        this.lastPosition = new Vec2D(0, 0);
    }

    public hoveredItem(vec: Vec2D): Item | null {
        return (
            this.whiteboard
                .itemsInside(this._posVec, this.width, this.height)
                .find((item) => {
                    return item.hovered(this._posVec.addVec(vec));
                }) ?? null
        );
    }

    public draw(vec: Vec2D) {
        this.clearView();

        const items = this.whiteboard.itemsInside(
            this._posVec,
            this.width,
            this.height
        );

        for (let item of items) {
            item.draw(
                this.whiteboard.getContext(),
                this,
                item.hovered(this._posVec.addVec(vec))
            );
        }
    }

    public initDrag(initVec: Vec2D) {
        this._isDragged = true;
        this.lastPosition = initVec.copy();
    }

    public move(moveVec: Vec2D) {
        if (!this._isDragged) return;

        this._posVec = this._posVec.addVec(
            moveVec.subtractVec(this.lastPosition).invert()
        );
        this.lastPosition = moveVec.copy();
    }

    public endDrag() {
        this._isDragged = false;
    }

    private clearView() {
        this.whiteboard.getContext().beginPath();
        this.whiteboard.getContext().clearRect(0, 0, this.width, this.height);
        this.whiteboard.getContext().fill();
        this.whiteboard.getContext().closePath();
    }

    public setSize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    get posVec(): Vec2D {
        return this._posVec;
    }

    get isDragged(): boolean {
        return this._isDragged
    }
}
