import type Board from "../schemas/whiteboard";
import RectangleTool from "./rectangleTool";

export default function Toolbelt({ whiteboard }: { whiteboard: Board | null }) {
    return (
        <div className="border border-white h-[70px] rounded-lg py-2 px-4 flex gap-x-2 items-center">
            <RectangleTool {...{ whiteboard }} />
        </div>
    );
}
