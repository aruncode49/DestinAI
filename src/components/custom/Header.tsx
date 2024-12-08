import { stringConstants } from "@/constants/stringConstants";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <div className="flex justify-between py-2 items-center">
            <h1
                className="text-[1.1rem] font-semibold shadow-sm shadow-blue-200 px-2 py-1 rounded-lg"
                dangerouslySetInnerHTML={{ __html: stringConstants.logo }}
            />
            <Button>{stringConstants.signin}</Button>
        </div>
    );
}
