import type Item from "./items/item";
import type Whiteboard from "./whiteboard";

export default class View {
    private x: number;
    private y: number;

    private beingDraged: boolean = false;
    private lastDragPosition: Array<number> = [0, 0];

    constructor(
        private whiteboard: Whiteboard,
        private width: number,
        private height: number
    ) {
        this.x = 0;
        this.y = 0;
    }

    public hoveredItem(x: number, y: number): Item | null {
        return (
            this.whiteboard
                .itemsInsideRange(this.x, this.y, this.width, this.height)
                .find((item) =>
                    item.hovered(
                        this.x - x + item.getWidth(),
                        this.y - y + item.getHeight()
                    )
                ) ?? null
        );
    }

    public draw(mouseX: number, mouseY: number) {
        this.clearView();

        const items = this.whiteboard.itemsInsideRange(
            this.x,
            this.y,
            this.width,
            this.height
        );

        let hovered = this.hoveredItem(mouseX, mouseY);

        for (let item of items) {
            item.draw(this.whiteboard.getContext(), this, hovered === item);
        }
    }

    public initDrag(x: number, y: number) {
        this.beingDraged = true;
        this.lastDragPosition = [x, y];
    }

    public move(x: number, y: number) {
        if (!this.beingDraged) return;

        this.x += x - this.lastDragPosition[0];
        this.y += y - this.lastDragPosition[1];

        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);

        this.lastDragPosition = [x, y];
    }

    public endDrag() {
        this.beingDraged = false;
        this.lastDragPosition = [];
    }

    public clearView() {
        this.whiteboard.getContext().beginPath();
        this.whiteboard.getContext().clearRect(0, 0, this.width, this.height);
        this.whiteboard.getContext().fill();
        this.whiteboard.getContext().closePath();
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setSize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
}
