import { stringConstants } from "@/constants/stringConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useEffect, useState } from "react";
import Spinner from "@/components/custom/Spinner";
import { ITripData } from "@/interfaces/tripData";
import TripCard from "./components/TripCard";

export default function MyTrips() {
    // hooks
    const navigate = useNavigate();

    // state
    const [tripData, setTripData] = useState<ITripData[] | []>([]);

    const fetchMyTrips = async () => {
        const userString = localStorage.getItem("user");
        if (!userString) {
            toast.error(stringConstants.pleaseLogin);
            return navigate("/");
        }

        try {
            const user = JSON.parse(userString);

            // get all my trips from firestore
            const q = query(
                collection(db, "travelPlan"),
                where("userEmail", "==", user?.email)
            );
            const querySnapshot = await getDocs(q);
            let tripData = [] as ITripData[];
            querySnapshot.forEach((doc) => {
                tripData.push(doc.data() as ITripData);
            });
            setTripData(tripData as ITripData[]);
        } catch (error) {
            toast.error(stringConstants.somethingWentWrong);
        }
    };

    useEffect(() => {
        fetchMyTrips();
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">
                {stringConstants.myTrips}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                {stringConstants.viewManageTrips}
            </p>

            {tripData && tripData.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                    {tripData.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}
