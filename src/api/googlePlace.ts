import axios from "axios";

interface IData {
    textQuery: string;
}

const basePath = "https://places.googleapis.com/v1/places:searchText";

const getPhotoByResourceName = (name: string) => {
    const photoUrl = `https://places.googleapis.com/v1/${name}/media?key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    }&maxHeightPx=600`;
    return photoUrl;
};

export const getGooglePlacePhoto = async (data: IData) => {
    const response = await axios.post(basePath, data, {
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
            "X-Goog-FieldMask": [
                "places.displayName",
                "places.id",
                "places.photos",
            ],
        },
    });
    if (response?.data?.places?.[0]?.photos) {
        const photos = response.data.places[0].photos;

        // Attempt to get photoName from photos[4], fallback to photos[1], or default to null
        const photoName = photos?.[4]?.name || photos?.[1]?.name || null;

        if (photoName) {
            // If a valid photoName is found, retrieve the photo URL
            return getPhotoByResourceName(photoName);
        }
    }
};
