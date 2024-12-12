export interface ITravelPlan {
    hotels: Hotel[];
    dailyItinerary: Itinerary[];
}

interface Hotel {
    hotelName: string;
    hotelAddress: string;
    price: number;
    hotelImageUrl: string;
    geoCoordinates: [number, number];
    rating: number;
    description: string;
}

interface Itinerary {
    day: string;
    placeName: string;
    placeDetails: string;
    placeImageUrl: string;
    geoCoordinates: [number, number];
    ticketPricing: number;
    rating: number;
    bestTimeToVisit: string;
    timeToTravel: number;
}
