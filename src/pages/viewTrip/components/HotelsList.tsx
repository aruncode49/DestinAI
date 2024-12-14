import { stringConstants } from "@/constants/stringConstants";
import React from "react";
import HotelCard from "./HotelCard";

export default function HotelsList({ trip }: { trip: any }) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
                {stringConstants.hotelRecommendation}
            </h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {trip?.generatedTravelData?.hotels?.map(
                    (hotel: any, index: number) => (
                        <React.Fragment key={index}>
                            <HotelCard hotel={hotel} />
                        </React.Fragment>
                    )
                )}
            </div>
        </div>
    );
}
