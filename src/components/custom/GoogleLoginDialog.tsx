import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { X } from "lucide-react";
import axios from "axios";
import Spinner from "@/components/custom/Spinner";
import { toast } from "sonner";
import { stringConstants } from "@/constants/stringConstants";

interface GoogleLoginDialogProps {
    onClose: () => void;
    onSuccess: () => void;
}

const GoogleLoginDialog: React.FC<GoogleLoginDialogProps> = ({
    onClose,
    onSuccess,
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onGoogleLogin = useGoogleLogin({
        onSuccess: (response) => getUser(response.access_token),
        onError: (errResponse) => {
            console.error(errResponse);
            toast.error("Google login failed.");
        },
    });

    const getUser = async (token: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "Application/json",
                    },
                }
            );

            if (response.data) {
                onClose(); // close the dialog
                localStorage.setItem("user", JSON.stringify(response.data)); // set the user data inside local storage
                onSuccess(); // do some work after login.
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch user details.");
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                {loading && <Spinner />}
                <DialogClose
                    className="absolute top-4 right-4 hover:bg-gray-200 p-1 rounded-full"
                    onClick={onClose}
                >
                    <X size={16} />
                </DialogClose>
                <DialogHeader>
                    <DialogTitle className="font-medium text-lg">
                        {stringConstants.signInWithGoogle}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        {stringConstants.authDialogDesc}
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={() => onGoogleLogin()}>
                    <img className="h-5" src="/google.svg" alt="google logo" />
                    {stringConstants.signInWithGoogle}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default GoogleLoginDialog;
