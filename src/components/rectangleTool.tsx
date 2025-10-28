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
                whiteboard?.createRectangle(10, 10, 150, 100);
            }}
        >
            <FaRegSquare color="white" size={20} />
        </Tool>
    );
}
