import { getGooglePlacePhoto } from "@/api/googlePlace";
import { stringConstants } from "@/constants/stringConstants";
import { Place2 } from "@/interfaces/tripData";
import { ratingStars } from "@/lib/starsRating";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function PlaceItem({ place }: { place: Place2 }) {
    // states
    const [photoUrl, setPhotoUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // actions
    const getLocationPhoto = async () => {
        try {
            const photoUrl = await getGooglePlacePhoto({
                textQuery: place.placeName,
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
        if (place) {
            getLocationPhoto();
        }
    }, [place]);

    return (
        <div className="mt-4">
            <h3 className="text-sm font-semibold text-orange-600">
                {place.bestTimeToVisit}
            </h3>

            <Link
                to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
                target="_blank"
                className="mt-2 border rounded-md p-2 flex gap-3 cursor-pointer transition-all duration-200 shadow hover:shadow-md"
            >
                {isLoading ? (
                    <div className="max-h-[120px] w-full max-w-[150px] bg-gray-200 rounded-md animate-pulse" />
                ) : (
                    <img
                        className="max-h-[120px] w-full max-w-[150px] object-cover rounded-md"
                        src={photoUrl}
                        alt="place image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "/placeholder.jpg";
                        }}
                    />
                )}

                <div className="space-y-1">
                    <h1 className="font-semibold text-sm md:text-base line-clamp-1">
                        {place.placeName}
                    </h1>
                    <p className="text-xs md:text-sm font-medium text-gray-500 line-clamp-2">
                        {place.placeDetails}
                    </p>

                    <p className="text-xs md:text-sm font-medium text-gray-500">
                        Time to travel: {place.timeToTravel}
                    </p>
                    <div className="flex justify-between w-full">
                        <p className="text-xs md:text-sm font-medium text-gray-500 line-clamp-1">
                            <span className="text-green-600">
                                {place.ticketPricing}
                            </span>
                        </p>
                        <p className="text-xs md:text-sm mr-5">
                            {ratingStars(place.rating)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
