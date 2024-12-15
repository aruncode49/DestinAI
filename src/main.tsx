import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTripPage from "./pages/createTrip.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import Hero from "./components/custom/Hero.tsx";
import ViewTrip from "./pages/viewTrip/index.tsx";
import MyTrips from "./pages/myTrips/index.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <p>Page Not Found</p>, // catches all global routes
        children: [
            {
                path: "",
                element: <Hero />,
            },
            {
                path: "create-trip",
                element: <CreateTripPage />,
            },
            {
                path: "view/:tripId",
                element: <ViewTrip />,
            },
            {
                path: "my-trips/",
                element: <MyTrips />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
        </GoogleOAuthProvider>
    </StrictMode>
);
