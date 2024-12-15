import { stringConstants } from "@/constants/stringConstants";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="border-t border-gray-200 p-4 text-center space-y-2">
            <div className="flex justify-center items-center gap-3">
                <Link
                    to="https://www.linkedin.com/in/aruncode49/"
                    target="_blank"
                >
                    <FaLinkedin className="text-blue-600" />
                </Link>
                <Link to="https://github.com/aruncode49" target="_blank">
                    <FaGithub />
                </Link>
            </div>
            <p className="text-xs">{stringConstants.footerText}</p>
        </div>
    );
}
