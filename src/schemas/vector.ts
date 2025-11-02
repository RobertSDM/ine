export default class Vec2D {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public subtractVec(vec: Vec2D): Vec2D {
        return new Vec2D(this._x - vec.x, this._y - vec.y);
    }

    public subtract(x: number, y: number): Vec2D {
        return new Vec2D(this._x - x, this._y - y);
    }

    public addVec(vec: Vec2D): Vec2D {
        return new Vec2D(this._x + vec.x, this._y + vec.y);
    }

    public copy() {
        return new Vec2D(this._x, this._y);
    }

    public invert() {
        return new Vec2D(this._x * -1, this._y * -1);
    }

    public invertX() {
        return new Vec2D(this._x * -1, this._y);
    }

    public invertY() {
        return new Vec2D(this._x, this._y * -1);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}
