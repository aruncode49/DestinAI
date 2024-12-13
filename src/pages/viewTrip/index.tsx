import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "@/components/custom/Spinner";
import TripInfo from "./components/TripInfo";
const GoogleLoginDialog = lazy(
    () => import("@/components/custom/GoogleLoginDialog")
);

export default function ViewTrip() {
    // hooks
    const { tripId } = useParams();

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [tripData, setTripData] = useState({});

    const fetchTripData = async () => {
        try {
            if (tripId) {
                setLoading(true);
                const docRef = doc(db, "travelPlan", tripId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTripData(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // effect
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpen(true);
        } else {
            fetchTripData();
        }
    }, []);

    return (
        <div>
            {loading && <Spinner />}

            {/* Trip Information */}
            <TripInfo trip={tripData} />

            {/* Daily Plan */}

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