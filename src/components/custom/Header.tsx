import { stringConstants } from "@/constants/stringConstants";
import { Button } from "../ui/button";
import LogoutDropdown from "./LogoutDropdown";
import { lazy, Suspense, useState } from "react";
import Spinner from "./Spinner";
import { googleLogout } from "@react-oauth/google";
import { Link, NavLink, useNavigate } from "react-router-dom";
const GoogleLoginDialog = lazy(
    () => import("@/components/custom/GoogleLoginDialog")
);

export interface IUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}

export default function Header() {
    // hooks
    const navigate = useNavigate();

    // state
    const [open, setOpen] = useState(false);

    // vars
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // actions
    const onLogout = async () => {
        googleLogout();
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="flex justify-between py-2 items-center">
            <Link to="/" className="active:scale-95">
                <h1
                    className="text-[1.1rem] font-semibold"
                    dangerouslySetInnerHTML={{ __html: stringConstants.logo }}
                />
            </Link>

            {user ? (
                <div className="flex items-center gap-2">
                    <NavLink to="/create-trip">
                        <Button
                            className="rounded-3xl text-gray-700"
                            size="sm"
                            variant="outline"
                        >
                            {stringConstants.createTrip}
                        </Button>
                    </NavLink>
                    <NavLink to="/my-trips">
                        <Button
                            className="rounded-3xl text-gray-700"
                            size="sm"
                            variant="outline"
                        >
                            {stringConstants.myTrips}
                        </Button>
                    </NavLink>
                    <LogoutDropdown onLogout={onLogout}>
                        <div className="h-9 w-9 bg-orange-600 text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-500 font-medium">
                            {user.name.charAt(0).toUpperCase() ?? "U"}
                        </div>
                    </LogoutDropdown>
                </div>
            ) : (
                <Button onClick={() => setOpen(true)} variant="primary">
                    {stringConstants.signin}
                </Button>
            )}

            {open && (
                <Suspense fallback={<Spinner />}>
                    <GoogleLoginDialog
                        onClose={() => setOpen(false)}
                        onSuccess={() => navigate("/create-trip")}
                    />
                </Suspense>
            )}
        </div>
    );
}
