export const getHotelsByCancelation=(hotels,isCancellable)=>{
    const filteredHotels=hotels.filter((hotel)=>hotel.isCancelable===isCancellable);
    return filteredHotels;
}