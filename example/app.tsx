import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useUrlQueryState } from "use-url-query-state";

const App = () => {
    const [value, set] = useUrlQueryState<{ a: number, b: string }>("a", { a: 0, b: "0" });
    const [value2, set2] = useUrlQueryState<number>("x", 100);

    console.log("RENDER", new Date(), value);
    const handleClick = async () => {

        set({ a: value.a + 1, b: value.b + "1" });
        set2(value2 + 1);
    }
    return (
        <>
            <h1>Hello World</h1>
            <button onClick={handleClick}>TEST</button>
        </>
    )
}

const rootElement = document.getElementById("root");
if (rootElement == null) {
    throw new Error("Root not defined");
}

const root = createRoot(rootElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);