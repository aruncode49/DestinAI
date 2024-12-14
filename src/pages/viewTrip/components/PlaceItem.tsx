import { getGooglePlacePhoto } from "@/api/googlePlace";
import { ratingStars } from "@/lib/starsRating";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IPlace {
    placeName: string;
    placeDetails: string;
    placeImageUrl: string;
    geoCoordinates: [number, number];
    ticketPricing: string;
    rating: number;
    bestTimeToVisit: string;
    timeToTravel: number;
}

export default function PlaceItem({ place }: { place: IPlace }) {
    // states
    const [photoUrl, setPhotoUrl] = useState<string>("");

    // actions
    const getLocationPhoto = async () => {
        const photoUrl = await getGooglePlacePhoto({
            textQuery: place.placeName,
        });
        setPhotoUrl(photoUrl ?? "");
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
                className="mt-2 border rounded-md p-2 flex gap-3 cursor-pointer md:hover:scale-105 transition-all duration-200 hover:shadow-md"
            >
                <img
                    className="max-h-[120px] w-full max-w-[150px] object-cover rounded-md"
                    src={photoUrl}
                    alt="place image"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                    }}
                />

                <div className="space-y-1">
                    <h1 className="font-semibold text-sm md:text-base">
                        {place.placeName}
                    </h1>
                    <p className="text-xs md:text-sm font-medium text-gray-500">
                        {place.placeDetails}
                    </p>

                    <p className="text-xs md:text-sm font-medium text-gray-500">
                        Time to travel: {place.timeToTravel}
                    </p>
                    <div className="flex justify-between w-full">
                        <p className="text-xs md:text-sm font-medium text-gray-500">
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
