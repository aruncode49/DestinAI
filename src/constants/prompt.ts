export const AI_PROMPT = `
"Create a detailed {totalDays} days travel plan for {traveler} visiting {location} on a {budget} budget. Provide the following structured data in JSON format:

1. Hotels Options
hotelName: The name of the hotel.
hotelAddress: Full address of the hotel.
price: Approximate cost per night for a budget stay.
hotelImageUrl: URL of a placeholder image representing the hotel.
geoCoordinates: GPS coordinates (latitude, longitude) of the hotel.
rating: Average user rating (out of 5 stars).
description: A brief summary of the hotel, highlighting amenities and suitability for couples on a budget.


2. Daily Itinerary
For each of the 3 days, provide:

day: Day 1, Day 2, or Day 3.
placeName: Name of the place or attraction to visit.
placeDetails: A brief description of the place, highlighting why it's ideal for a couple.
placeImageUrl: URL of a placeholder image representing the attraction.
geoCoordinates: GPS coordinates (latitude, longitude) of the place.
ticketPricing: Approximate entry fee or cost (if applicable).
rating: Average user rating (out of 5 stars).
bestTimeToVisit: Suggested time of day for the visit (e.g., morning, afternoon, evening).
timeToTravel: Estimated travel time to reach the location from the previous destination (in minutes).
`;
