import { useEffect, useRef, useState } from "react";
import Toolbelt from "../components/toolbelt";
import Whiteboard from "../schemas/whiteboard";
import View from "../schemas/view";

export default function WhiteboardPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const loopRef = useRef<number>(0);

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [mousePosition, setMousePosition] = useState<Array<number>>([]);

    const [whiteboard, setWhiteboard] = useState<null | Whiteboard>(null);
    const [view, setView] = useState<null | View>(null);

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

        view?.draw(mousePosition[0], mousePosition[1]);

        loopRef.current = requestAnimationFrame(drawLoop);
    }

    useEffect(() => {
        loopRef.current = requestAnimationFrame(drawLoop);

        return () => cancelAnimationFrame(loopRef.current);
    }, [whiteboard, mousePosition]);

    return (
        <section className="relative">
            <canvas
                id="whiteboard"
                ref={canvasRef}
                width={width}
                height={height}
                className="w-full h-[100dvh] bg-neutral-900"
                onMouseMove={(e) => {
                    setMousePosition([e.clientX, e.clientY]);

                    view?.move(e.clientX, e.clientY);
                }}
                onMouseDown={(e) => {
                    if (!!view?.hoveredItem(e.clientX, e.clientY)) return;

                    view?.initDrag(e.clientX, e.clientY);
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
