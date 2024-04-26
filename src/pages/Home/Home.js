import { useEffect,useState } from "react";
import { Navbar,HotelCard,Categories,SearchStayWithDate,Filter,AuthModal,ProfileDropDown,Alert } from "../../components";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import './Home.css';
import { useCategory,useDate,useFilter,useAuth,useAlert } from "../../context";
import { getHotelsByPrice,getHotelsByRoomsAndBeds,
        getHotelsByPropertyType,getHotelsByRating,getHotelsByCancelation } from "../../utils";

export const Home=()=>{

    const [hasMore,setHasMore]=useState(true);
    const [currentIndex,setCurrentIndex]=useState(16);
    const [testData,setTestData]=useState([]);
    const [hotels,setHotels]=useState([]);
    const {hotelCategory,setHotelCategory}=useCategory();
    const {isSearchModalOpen}=useDate();
    const {isFilterModalOpen,noOfBathrooms,noOfBedrooms,noOfBeds,
            priceRange,propertyType,hotelRatings,isCancellable}=useFilter();

    const {isAuthModalOpen,isDropDownModalOpen}=useAuth();
    const {alert}=useAlert();
    

    useEffect(()=>{
        const fetchHotels=async ()=>{
            try {
                let url = 'https://travelin.cyclic.app/api/hotels';
                if (hotelCategory) {
                    url += `?category=${hotelCategory}`;
                }
                const { data } = await axios.get(url);
                setTestData(data);
                setHotels(data ? data.slice(0, 16) : []);
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

    const fetchMoreData=()=>{
        if(hotels.length>=testData.length){
            setHasMore(false);
            return
        }
        setTimeout(() => {
            if(hotels && hotels.length>0){
                setHotels(hotels.concat(testData.slice(currentIndex,currentIndex+16)));
                setCurrentIndex(prev=>prev+16)
            }else{
                setHotels([]);
            }            
        }, 1000);
    }

    const filteredHotelsByPrice=getHotelsByPrice(hotels,priceRange);
    const filteredHotelsByRoomsAndBeds=getHotelsByRoomsAndBeds(filteredHotelsByPrice,noOfBathrooms,noOfBedrooms,noOfBeds);
    const filteredHotelsByPropertyType=getHotelsByPropertyType(filteredHotelsByRoomsAndBeds,propertyType);
    const filteredHotelsByRating=getHotelsByRating(filteredHotelsByPropertyType,hotelRatings);
    const filteredHotelsByCancelation=getHotelsByCancelation(filteredHotelsByRating,isCancellable)

    return(
        <div className="relative">
            <Navbar route="home"/>
            <Categories/>
            {
                hotels && hotels.length>0 ? (
                    <InfiniteScroll
                        dataLength={hotels.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={hotels.length > 0 && <h3 className="alert-text">Loading...</h3>}
                        endMessage={<p className="alert-text">You have seen it all</p>}
                    >
                        <main className="main d-flex align-center wrap gap-larger">
                            {
                                filteredHotelsByCancelation && filteredHotelsByCancelation.map((hotel)=>
                                        (<HotelCard key={hotel._id} hotel={hotel}/>))
                            }  
                        </main>
                    </InfiniteScroll>
                ) : (<></>)
            }
            {isSearchModalOpen && <SearchStayWithDate/>}
            {isFilterModalOpen && <Filter/>}
            {isAuthModalOpen && <AuthModal/>}
            {isDropDownModalOpen && <ProfileDropDown/>}
            {alert.open && <Alert/>}
        </div>
    )
}