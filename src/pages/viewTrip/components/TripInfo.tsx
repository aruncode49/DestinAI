import { getGooglePlacePhoto } from "@/api/googlePlace";
import { stringConstants } from "@/constants/stringConstants";
import { useEffect, useState } from "react";

export default function TripInfo({ trip }: { trip: any }) {
    // states
    const [photoUrl, setPhotoUrl] = useState<string>("");

    // actions
    const getLocationPhoto = async () => {
        const photoUrl = await getGooglePlacePhoto({
            textQuery: trip?.userSelection?.place?.label,
        });
        setPhotoUrl(photoUrl ?? "");
    };

    useEffect(() => {
        if (trip?.userSelection) {
            getLocationPhoto();
        }
    }, [trip]);

    return (
        <div className="mt-8">
            <img
                className="h-[15rem] md:h-[20rem] w-full object-cover rounded-2xl"
                src={photoUrl}
                alt="Trip Image"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
            />
            <div className="mt-4 space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">
                    {trip?.userSelection?.place?.label}
                </h2>
                <div className="flex items-center gap-2 md:gap-3">
                    <p className="flex flex-wrap items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-100 text-gray-600 rounded-2xl">
                        📅{trip?.userSelection?.days}{" "}
                        {stringConstants.days(trip?.userSelection?.days)}
                    </p>
                    <p className="flex items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-100 text-gray-600 rounded-2xl">
                        💰{trip?.userSelection?.budget}
                    </p>
                    <p className="flex items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-100 text-gray-600 rounded-2xl">
                        🥂{trip?.userSelection?.traveler}
                    </p>
                </div>
            </div>
        </div>
    );
}
