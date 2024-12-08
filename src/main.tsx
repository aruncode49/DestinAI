import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/Header";
import CreateTripPage from "./pages/createTrip.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <p>Page Not Found</p>, // catches all global routes
    },
    {
        path: "/create-trip/",
        element: <CreateTripPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <div className="lg:max-w-screen-lg mx-auto px-3 lg:px-4">
            <Header />
            <RouterProvider router={router} />
        </div>
    </StrictMode>
);
