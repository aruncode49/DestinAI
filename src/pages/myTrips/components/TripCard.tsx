import { getGooglePlacePhoto } from "@/api/googlePlace";
import { stringConstants } from "@/constants/stringConstants";
import { ITripData } from "@/interfaces/tripData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function TripCard({ trip }: { trip: ITripData }) {
    // states
    const [photoUrl, setPhotoUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // actions
    const getLocationPhoto = async () => {
        try {
            const photoUrl = await getGooglePlacePhoto({
                textQuery: trip.userSelection.place.label,
            });
            setPhotoUrl(photoUrl ?? "");
        } catch (error) {
            toast.error(stringConstants.somethingWentWrong);
        } finally {
            setIsLoading(false);
        }
    };

    // effect
    useEffect(() => {
        if (trip) {
            getLocationPhoto();
        }
    }, [trip]);

    return (
        <Link
            to={`/view/${trip.id}`}
            className="p-2 border shadow rounded-lg cursor-pointer hover:shadow-md"
        >
            {isLoading ? (
                <div className="h-[8rem] md:h-[9rem] w-full rounded-lg bg-gray-200 animate-pulse" />
            ) : (
                <img
                    className="h-[8rem] md:h-[9rem] w-full object-cover rounded-lg"
                    src={photoUrl}
                    alt="hotel image"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                    }}
                />
            )}
            <h2 className="text-sm font-medium text-gray-800 mt-2 line-clamp-1">
                {trip.userSelection.place.label}
            </h2>
            <p className="text-xs text-gray-500">
                {stringConstants.tripDays(trip.userSelection.days)} trip in{" "}
                {trip.userSelection.budget}{" "}
                {stringConstants.budget(trip.userSelection.budget)}.
            </p>
        </Link>
    );
}
