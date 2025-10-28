import { createBrowserRouter } from "react-router";
import WhiteboardPage from "../pages/whiteboardPage";

const router = createBrowserRouter([
    {
        path: "/whiteboard",
        Component: WhiteboardPage,
    },
]);

export default router;
