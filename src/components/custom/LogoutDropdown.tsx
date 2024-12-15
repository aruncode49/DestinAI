import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { stringConstants } from "@/constants/stringConstants";
import { LogOut } from "lucide-react";

interface ILogoutDropdown {
    children: JSX.Element;
    onLogout: () => void;
}

export default function LogoutDropdown(props: ILogoutDropdown) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
                <DropdownMenuItem
                    onClick={props.onLogout}
                    className="cursor-pointer font-medium"
                >
                    <LogOut /> {stringConstants.logout}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
