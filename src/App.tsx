import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

export default function App() {
    return (
        <div className="lg:max-w-screen-lg mx-auto px-3 lg:px-4">
            <Header />
            <Outlet />
        </div>
    );
}
