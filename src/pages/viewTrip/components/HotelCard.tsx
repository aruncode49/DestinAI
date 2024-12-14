import { getGooglePlacePhoto } from "@/api/googlePlace";
import { ratingStars } from "@/lib/starsRating";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IHotel {
    description: string;
    geoCoordinates: number[];
    price: string;
    hotelName: string;
    hotelImageUrl: string;
    hotelAddress: string;
    rating: number;
}

export default function HotelCard({ hotel }: { hotel: IHotel }) {
    // states
    const [photoUrl, setPhotoUrl] = useState<string>("");

    // actions
    const getLocationPhoto = async () => {
        const photoUrl = await getGooglePlacePhoto({
            textQuery: hotel.hotelName,
        });
        setPhotoUrl(photoUrl ?? "");
    };

    // effect
    useEffect(() => {
        if (hotel) {
            getLocationPhoto();
        }
    }, [hotel]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
            target="_blank"
            className="space-y-1 md:space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
            <img
                className="h-[8rem] md:h-[10rem] w-full object-cover rounded-lg"
                src={photoUrl}
                alt="hotel image"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
            />
            <h3 className="text-gray-700 font-medium mt-1 text-sm md:text-base">
                {hotel?.hotelName}
            </h3>
            <p className="text-[10px] md:text-xs font-medium text-gray-500">
                {hotel?.hotelAddress}
            </p>
            <p className="text-[10px] md:text-xs font-medium text-gray-500">
                <span className="text-green-600">{hotel?.price}</span> /night
            </p>
            <p className="text-[10px] md:text-xs font-medium text-gray-500">
                {ratingStars(hotel?.rating)}
            </p>
        </Link>
    );
}
