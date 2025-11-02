import { useEffect, useRef, useState } from "react";
import Toolbelt from "../components/toolbelt";
import Whiteboard from "../schemas/whiteboard";
import View from "../schemas/view";
import Vec2D from "../schemas/vector";

export default function WhiteboardPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [mousePosition, setMousePosition] = useState<Vec2D>(
        new Vec2D(5000, 5000)
    );

    const [whiteboard, setWhiteboard] = useState<null | Whiteboard>(null);
    const [view, setView] = useState<View | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        let whiteboard = new Whiteboard(ctx);
        setWhiteboard(whiteboard);
        setView(new View(whiteboard, width, height));
    }, []);

    function getWindowSize() {
        return [window.innerWidth, window.innerHeight];
    }

    function updateSize(width: number, height: number) {
        view?.setSize(width, height);
        setWidth(width);
        setHeight(height);
    }

    function drawLoop() {
        const [w, h] = getWindowSize();
        updateSize(w, h);

        view?.draw(mousePosition);

        return requestAnimationFrame(drawLoop);
    }

    useEffect(() => {
        const ref = requestAnimationFrame(drawLoop);

        return () => cancelAnimationFrame(ref);
    });

    return (
        <section className="relative">
            <canvas
                id="whiteboard"
                ref={canvasRef}
                width={width}
                height={height}
                className={`w-full h-[100dvh] bg-neutral-900 ${
                    view?.isDragged ? "cursor-grabbing" : "cursor-default"
                }`}
                onMouseMove={(e) => {
                    const mouseVec = new Vec2D(e.clientX, e.clientY);

                    setMousePosition(mouseVec);
                    view?.move(mouseVec);
                }}
                onMouseDown={(e) => {
                    const mouseVec = new Vec2D(e.clientX, e.clientY);

                    if (!!view?.hoveredItem(mouseVec)) return;

                    view?.initDrag(mouseVec);
                }}
                onMouseUp={() => {
                    view?.endDrag();
                }}
            ></canvas>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <Toolbelt {...{ whiteboard }} />
            </div>
        </section>
    );
}
