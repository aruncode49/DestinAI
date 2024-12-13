import { stringConstants } from "@/constants/stringConstants";
import { BadgeDollarSign, CalendarDays, UsersRound } from "lucide-react";

export default function TripInfo({ trip }: { trip: any }) {
    return (
        <div className="mt-8">
            <img
                className="h-[15rem] md:h-[20rem] w-full object-cover rounded-2xl"
                src="/placeholder.jpg"
                alt="Trip Image"
            />
            <div className="mt-4 space-y-3">
                <h2 className="text-xl font-semibold text-gray-600">
                    {trip?.userSelection?.place?.label}
                </h2>
                <div className="flex items-center gap-2 md:gap-3">
                    <p className="flex flex-wrap items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-200 text-gray-600 rounded-2xl">
                        <CalendarDays className="size-3 md:size-4" />
                        {trip?.userSelection?.days}{" "}
                        {stringConstants.days(trip?.userSelection?.days)}
                    </p>
                    <p className="flex items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-200 text-gray-600 rounded-2xl">
                        <BadgeDollarSign className="size-3 md:size-4" />
                        {trip?.userSelection?.budget}
                    </p>
                    <p className="flex items-center gap-1 px-3 py-1 text-xs md:text-base font-medium bg-gray-200 text-gray-600 rounded-2xl">
                        <UsersRound className="size-3 md:size-4" />
                        {trip?.userSelection?.traveler}
                    </p>
                </div>
            </div>
        </div>
    );
}
