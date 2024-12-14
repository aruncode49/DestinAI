export const AI_PROMPT = `
"Create a detailed {totalDays} days travel plan for {traveler} visiting {location} on a {budget} budget. Provide the following structured data in JSON format:

1. Hotels Options
hotelName: The name of the hotel.
hotelAddress: Full address of the hotel.
price: Approximate cost range of per night for a budget stay in dollar with a dollar sign.
hotelImageUrl: URL of a placeholder image representing the hotel.
geoCoordinates: GPS coordinates (latitude, longitude) of the hotel.
rating: Average user rating (out of 5 stars).
description: A brief summary of the hotel, highlighting amenities and suitability for couples on a budget.

2. Daily Itinerary
For each of the {totalDays} days, provide an array of places to visit on that day. Each day should include the following structure:

day: Day 1, Day 2, etc.
places: An array of places to visit on that day, with each place containing:
  - placeName: Name of the place or attraction to visit.
  - placeDetails: A brief description of the place, highlighting why it's ideal for a couple.
  - placeImageUrl: URL of a placeholder image representing the attraction.
  - geoCoordinates: GPS coordinates (latitude, longitude) of the place.
  - ticketPricing: Approximate entry fee or cost (if applicable).
  - rating: Average user rating (out of 5 stars).
  - bestTimeToVisit: Suggested time of day for the visit (e.g., 9:00 AM - 11:30 AM).
  - timeToTravel: Estimated travel time to reach the location from the previous destination (Time format should be like 1 hour 30 min or 45 min like this.)

Ensure the itinerary data for each day groups all places to visit into the 'places' array."
`;
