export interface ITripData {
    userSelection: UserSelection;
    id: string;
    generatedTravelData: GeneratedTravelData;
    userEmail: string;
}

export interface UserSelection {
    days: string;
    place: Place;
    traveler: string;
    budget: string;
}

export interface Place {
    value: Value;
    label: string;
}

export interface Value {
    reference: string;
    types: string[];
    terms: Term[];
    matched_substrings: MatchedSubstring[];
    description: string;
    place_id: string;
    structured_formatting: StructuredFormatting;
}

export interface Term {
    value: string;
    offset: number;
}

export interface MatchedSubstring {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    secondary_text: string;
    main_text_matched_substrings: MainTextMatchedSubstring[];
    main_text: string;
}

export interface MainTextMatchedSubstring {
    offset: number;
    length: number;
}

export interface GeneratedTravelData {
    hotels: Hotel[];
    dailyItinerary: DailyItinerary[];
}

export interface Hotel {
    geoCoordinates: number[];
    hotelImageUrl: string;
    rating: number;
    hotelName: string;
    description: string;
    hotelAddress: string;
    price: string;
}

export interface DailyItinerary {
    places: Place2[];
    day: string;
}

export interface Place2 {
    placeImageUrl: string;
    rating: number;
    placeDetails: string;
    timeToTravel: number;
    ticketPricing: string;
    bestTimeToVisit: string;
    geoCoordinates: number[];
    placeName: string;
}
