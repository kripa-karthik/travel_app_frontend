export const getHotelsByRating=(hotels,hotelRatings)=>{
    if(hotelRatings==="Any") return hotels;
    const filteredHotels=hotels.filter((hotel)=>hotel.rating>=hotelRatings);
    return filteredHotels;

}