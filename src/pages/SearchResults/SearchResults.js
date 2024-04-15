import { useState,useEffect, Fragment } from "react";
import axios from "axios";
import { Navbar,HotelCard} from "../../components";
import { useCategory,useDate } from "../../context";

export const SearchResults=()=>{

    const {destination}=useDate();
    const [hotels,setHotels]=useState([]);
    const {hotelCategory,setHotelCategory}=useCategory();

    useEffect(()=>{
        const fetchHotels=async ()=>{
            try {
                let url = 'https://travelin.cyclic.app/api/hotels';
                if (hotelCategory) {
                    url += `?category=${hotelCategory}`;
                }
                const { data } = await axios.get(url);
                setHotels(data);
            } catch (err) {
                console.log(err);
            }
        }
        if (hotelCategory !== null && hotelCategory !== undefined) {
            fetchHotels();
        }

    },[destination])

    useEffect(() => {
        const hotelCategory = localStorage.getItem('hotelCategory');
        if (hotelCategory) {
            setHotelCategory(hotelCategory);
        }
    }, []);

    const filteredSearchResults=hotels.filter(({address,city,state})=>
    address.toLowerCase()===(destination.toLowerCase()) || 
    city.toLowerCase()===(destination.toLowerCase()) || 
    state.toLowerCase().includes ===(destination.toLowerCase()));

    return(
        <Fragment>
            <Navbar/>
            <section className="main d-flex align-center wrap gap-larger">
                {
                    filteredSearchResults ? (
                    filteredSearchResults.map((hotel)=> (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    )) ) : (
                        <h3>Nothing Found</h3>
                    )
                }

            </section>
        </Fragment>
    )
}