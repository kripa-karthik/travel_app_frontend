import {useNavigate} from "react-router-dom";
import { useWishlist,useAuth } from "../../context";
import { findHotelInWishlist } from "../../utils";
import './HotelCard.css';

export const HotelCard=({hotel})=>{

    const {_id,name,image,address,state,rating,price}=hotel;

    const {wishlist,wishlistDispatch}=useWishlist();
    const {accessToken,authDispatch}=useAuth();
    const isHotelInWishlist=findHotelInWishlist(wishlist,_id)

    const navigate=useNavigate();

    const handleHotelCardClick=()=>{
        navigate(`/hotels/${name}/${address}-${state}/${_id}/reserve`);

    }

    const handleWishlistClick=()=>{
        if(accessToken){
            if(!isHotelInWishlist){
                wishlistDispatch({
                    type:"ADD_TO_WISHLIST",
                    payload:hotel
                })
                navigate("/wishlist");
            }else{
                wishlistDispatch({
                    type:"REMOVE_FROM_WISHLIST",
                    payload:_id
                })
            }
        }else{
            authDispatch({
                type:"SHOW_AUTH_MODAL"
            })
        }
    }


    return(
        <div className="relative hotelcard-container shadow cursor-pointer">
            <div onClick={handleHotelCardClick}>
                <img className="img" 
                src={image}
                alt={name}>
                </img>
                <div className="hotelcard-details">
                    <div className='d-flex align-center gap-sm'>
                        <span className="location">{address}, {state}</span>
                        <span className="rating d-flex align-center">
                            <span className="material-icons-outlined">star</span>  
                            <span>{rating}</span>
                        </span>
                    </div>
                    <p className="hotel-name">{name}</p>
                    <p className="price-details">
                        <span className="price">Rs. {price}</span>
                        <span>/night</span>
                    </p>
                </div>
            </div>
            <button className="button btn-wishlist absolute" onClick={handleWishlistClick}>
                <span className={`material-icons favourite cursor 
                        ${isHotelInWishlist ? "fav-selected" : ""}`}>favorite</span>
            </button>
        </div>
    )
}