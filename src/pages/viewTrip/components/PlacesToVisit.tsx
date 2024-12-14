import { stringConstants } from "@/constants/stringConstants";
import PlaceItem from "./PlaceItem";

export default function PlacesToVisit({ trip }: { trip: any }) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
                {stringConstants.placesToVisit}
            </h2>
            {trip?.generatedTravelData?.dailyItinerary?.map(
                (item: any, index: number) => (
                    <div key={index} className="mt-5">
                        <h2 className="font-medium bg-gray-100 text-gray-600 w-fit px-3 py-1 rounded-3xl">
                            {item?.day}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {item?.places?.map((place: any, index: number) => (
                                <div key={index}>
                                    <PlaceItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
