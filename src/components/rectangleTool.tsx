import RectangleItem from "../schemas/items/rectangleItem";
import Vec2D from "../schemas/vector";
import type Whiteboard from "../schemas/whiteboard";
import Tool from "./tool";
import { FaRegSquare } from "react-icons/fa6";
export default function RectangleTool({
    whiteboard,
}: {
    whiteboard: Whiteboard | null;
}) {
    return (
        <Tool
            action={() => {
                whiteboard?.addItem(
                    new RectangleItem(new Vec2D(0, 0), 150, 100)
                );
                whiteboard?.addItem(
                    new RectangleItem(new Vec2D(150, -150), 150, 100)
                );
            }}
        >
            <FaRegSquare color="white" size={20} />
        </Tool>
    );
}
