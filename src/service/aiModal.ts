import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "\"Create a detailed 3-day travel plan for a couple visiting Las Vegas on a cheap budget. Provide the following structured data in JSON format:\n\n1. Hotels Options\nhotelName: The name of the hotel.\nhotelAddress: Full address of the hotel.\nprice: Approximate cost per night for a budget stay.\nhotelImageUrl: URL of a placeholder image representing the hotel.\ngeoCoordinates: GPS coordinates (latitude, longitude) of the hotel.\nrating: Average user rating (out of 5 stars).\ndescription: A brief summary of the hotel, highlighting amenities and suitability for couples on a budget.\n2. Daily Itinerary\nFor each of the 3 days, provide:\n\nday: Day 1, Day 2, or Day 3.\nplaceName: Name of the place or attraction to visit.\nplaceDetails: A brief description of the place, highlighting why it's ideal for a couple.\nplaceImageUrl: URL of a placeholder image representing the attraction.\ngeoCoordinates: GPS coordinates (latitude, longitude) of the place.\nticketPricing: Approximate entry fee or cost (if applicable).\nrating: Average user rating (out of 5 stars).\nbestTimeToVisit: Suggested time of day for the visit (e.g., morning, afternoon, evening).\ntimeToTravel: Estimated travel time to reach the location from the previous destination (in minutes).",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n{\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": 50,\n      "hotelImageUrl": "https://via.placeholder.com/350x150?text=Circus+Circus",\n      "geoCoordinates": [36.1204,-115.172],\n      "rating": 3.5,\n      "description": "A classic Vegas experience with affordable rooms and a lively atmosphere.  Offers some free entertainment, making it budget-friendly for couples.  May be a bit noisy."\n    },\n    {\n      "hotelName": "Main Street Station Casino, Brewery & Hotel",\n      "hotelAddress": "200 S. Main Street, Las Vegas, NV 89101",\n      "price": 60,\n      "hotelImageUrl": "https://via.placeholder.com/350x150?text=Main+Street+Station",\n      "geoCoordinates": [36.165,-115.141],\n      "rating": 4.0,\n      "description": "Offers a more historic and less flashy experience.  Good value for money and a quieter alternative to the Strip."\n    },\n    {\n      "hotelName": "Travelodge by Wyndham Las Vegas Center Strip",\n      "hotelAddress": "3655 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": 70,\n      "hotelImageUrl": "https://via.placeholder.com/350x150?text=Travelodge+Las+Vegas",\n      "geoCoordinates": [36.117,-115.17],\n      "rating": 3.8,\n      "description": "Convenient location near the Strip with basic but clean rooms.  A good compromise between price and location."\n    }\n  ],\n  "dailyItinerary": [\n    {\n      "day": "Day 1",\n      "placeName": "Fremont Street Experience",\n      "placeDetails": "Experience the vibrant atmosphere of downtown Las Vegas with free entertainment, street performers, and the Viva Vision light show. Ideal for a romantic evening stroll.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=Fremont+Street",\n      "geoCoordinates": [36.166,-115.141],\n      "ticketPricing": 0,\n      "rating": 4.2,\n      "bestTimeToVisit": "Evening",\n      "timeToTravel": 0 \n    },\n    {\n      "day": "Day 1",\n      "placeName": "In-N-Out Burger",\n      "placeDetails": "Enjoy a classic American burger for a cheap and delicious meal.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=In-N-Out",\n      "geoCoordinates": [36.12,-115.17],\n      "ticketPricing": 15,\n      "rating": 4.5,\n      "bestTimeToVisit": "Lunch",\n      "timeToTravel": 15\n    },\n    {\n      "day": "Day 2",\n      "placeName": "Seven Magic Mountains",\n      "placeDetails": "A unique and Instagrammable art installation outside of Las Vegas.  A short drive but offers stunning photos for couples.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=Seven+Magic+Mountains",\n      "geoCoordinates": [35.99,-115.03],\n      "ticketPricing": 0,\n      "rating": 4.0,\n      "bestTimeToVisit": "Afternoon",\n      "timeToTravel": 30\n    },\n    {\n      "day": "Day 2",\n      "placeName": "The Strip (walking section)",\n      "placeDetails": "Walk a section of the Strip, admiring the lights and architecture.  Focus on free attractions and window shopping.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=Las+Vegas+Strip",\n      "geoCoordinates": [36.11,-115.17],\n      "ticketPricing": 0,\n      "rating": 4.5,\n      "bestTimeToVisit": "Evening",\n      "timeToTravel": 45\n    },\n      {\n      "day": "Day 3",\n      "placeName": "Red Rock Canyon National Conservation Area",\n      "placeDetails": "Hike or drive through the scenic landscape for breathtaking views. A romantic getaway from the city.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=Red+Rock+Canyon",\n      "geoCoordinates": [36.2,-115.7],\n      "ticketPricing": 15,\n      "rating": 4.7,\n      "bestTimeToVisit": "Morning",\n      "timeToTravel": 45\n    },\n    {\n      "day": "Day 3",\n      "placeName": "Downtown Container Park",\n      "placeDetails": "Unique shopping and dining experience in repurposed shipping containers, often with live music.",\n      "placeImageUrl": "https://via.placeholder.com/350x150?text=Container+Park",\n      "geoCoordinates": [36.16,-115.14],\n      "ticketPricing": 0,\n      "rating": 4.0,\n      "bestTimeToVisit": "Afternoon",\n      "timeToTravel": 30\n    }\n  ]\n}\n```\n',
                },
            ],
        },
    ],
});
