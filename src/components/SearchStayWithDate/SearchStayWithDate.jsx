import { useEffect,useState } from "react";
import axios from 'axios';
import { DateSelector } from "../DateSelector/DataSelector";
import './SearchStayWithDate.css';
import { useCategory,useDate } from "../../context";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate=()=>{

    const {destination,guests,isSearchResultOpen,dateDispatch}=useDate();
    const [hotels,setHotels]=useState([]);
    const {hotelCategory,setHotelCategory}=useCategory();
    const navigate=useNavigate();

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

    },[hotelCategory])

    useEffect(() => {
        const hotelCategory = localStorage.getItem('hotelCategory');
        if (hotelCategory) {
            setHotelCategory(hotelCategory);
        }
    }, []);

    const handleGuestChange=(event)=>{
        dateDispatch({
            type:"GUESTS",
            payload:event.target.value
        })

    }

    const handleDestinationChange=(event)=>{
        dateDispatch({
            type:"DESTINATION",
            payload:event.target.value
        })
    }

    const handleSearchResultCLick=(address)=>{
        dateDispatch({
            type:"DESTINATION",
            payload:address
        })

    }

    const handleDestinationFocus=()=>{
        console.log(destinationOptions);
        dateDispatch({
            type:"SHOW_SEARCH_RESULT"
        })
    }

    const handleSearchClick=()=>{
        dateDispatch({
            type:'CLOSE_SEARCH_MODAL'
        })
        navigate(`/hotels/${destination}`)
    }

    const destinationOptions=hotels.filter(({address,city,state,country})=>address.toLowerCase().includes
    (destination.toLowerCase()) || city.toLowerCase().includes
    (destination.toLowerCase()) || state.toLowerCase().includes
    (destination.toLowerCase()) || country.toLowerCase().includes
    (destination.toLowerCase()))

    return(
        <div className="destination-container">
            <div className="destination-options d-flex align-center absolute">
                <div className="location-container">
                    <label className="label"> Where </label>
                    <input 
                        value={destination}
                        onChange={handleDestinationChange}
                        onFocus={handleDestinationFocus}
                        className="input search-dest"
                        placeholder="Search destination" autoFocus ></input>   
                </div>
                <div className="location-container">
                    <label className="label"> Check In </label>
                    <DateSelector  checkInType="checkin"/>                  
                </div>
                <div className="location-container">
                    <label className="label"> Check Out </label>
                    <DateSelector  checkInType="checkout"/>                  
                </div>
                <div className="location-container">
                    <label className="label">No. Of Guests </label>
                    <input value={guests} onChange={handleGuestChange} className="input search-dest" placeholder="Add guests"></input>                 
                </div>
                <div className="search-container d-flex align-center cursor" onClick={handleSearchClick}>
                    <span className="material-icons-outlined">search</span>
                    <span>Search</span>                                     
                </div>
            </div>
            {
                isSearchResultOpen && (
                    <div className="search-result-container absolute">
                        {
                            destinationOptions && destinationOptions.map(({address,city})=>(
                                <p className="p cursor" onClick={()=>handleSearchResultCLick(address)}>
                                    {address},{city}
                                </p>
                            ))
                        }
                    </div>)
            }

        </div>
    )
    
}