import { Loader2 } from "lucide-react";

export default function Spinner() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <Loader2
                size={"5rem"}
                className="animate-spin duration-700 text-white"
            />
        </div>
    );
}
