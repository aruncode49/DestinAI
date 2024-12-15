import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "@/components/custom/Spinner";
import TripInfo from "./components/TripInfo";
import HotelsList from "./components/HotelsList";
import PlacesToVisit from "./components/PlacesToVisit";
import { toast } from "sonner";
import { stringConstants } from "@/constants/stringConstants";
import { ITripData } from "@/interfaces/tripData";
const GoogleLoginDialog = lazy(
    () => import("@/components/custom/GoogleLoginDialog")
);

export default function ViewTrip() {
    // hooks
    const { tripId } = useParams();
    const navigate = useNavigate();

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [tripData, setTripData] = useState<ITripData>();

    const fetchTripData = async () => {
        try {
            if (tripId) {
                setLoading(true);
                const docRef = doc(db, "travelPlan", tripId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTripData(docSnap.data() as ITripData);
                } else {
                    toast.error("Trip not found!");
                }
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // effect
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/");
        } else {
            fetchTripData();
        }
    }, []);

    return (
        <div className="mb-10">
            {loading && <Spinner />}

            {/* Trip Information */}
            <TripInfo trip={tripData!} />

            {/* Hotels List */}
            <HotelsList trip={tripData!} />

            {/* Places to Visit */}
            <PlacesToVisit trip={tripData!} />

            {open && (
                <Suspense fallback={<Spinner />}>
                    <GoogleLoginDialog
                        onClose={() => setOpen(false)}
                        onSuccess={fetchTripData}
                    />
                </Suspense>
            )}
        </div>
    );
}
