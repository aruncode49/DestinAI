export const ratingStars = (rating: number) => {
    let stars = "";
    for (let i = 1; i <= Math.round(rating); i++) {
        stars += "⭐";
    }
    return stars;
};
