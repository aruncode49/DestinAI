import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="lg:max-w-screen-lg mx-auto px-3 lg:px-4 mb-10">
                    <Header />
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}
