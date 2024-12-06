import { stringConstants } from "@/constants/stringConstants";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <div className="mt-14 flex flex-col items-center justify-center space-y-8">
            <h1
                className="text-3xl lg:text-5xl font-bold text-center"
                dangerouslySetInnerHTML={{ __html: stringConstants.title }}
            />
            <p className="text-md lg:text-xl  text-center font-medium text-gray-600">
                {stringConstants.subtitle}
            </p>
            <Button onClick={() => navigate("/create-trip/")}>
                <ExternalLink />
                {stringConstants.getStarted}
            </Button>
        </div>
    );
}
