import { stringConstants } from "@/constants/stringConstants";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <div className="flex justify-between py-2 items-center">
            <img className="h-9" src="/logo.svg" alt="logo" />
            <Button>{stringConstants.signin}</Button>
        </div>
    );
}
