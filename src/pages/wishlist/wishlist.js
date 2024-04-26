import { Fragment } from "react";
import {Navbar,HotelCard} from '../../components';
import { useWishlist } from "../../context";
import './wishlist.css';

export const Wishlist=()=>{

    const {wishlist}=useWishlist();
    return(
        <Fragment>
            <Navbar route="wishlist"/>
            <div className="wishlist-page">
                <h2 className="heading-2">Your wishlist</h2>
                <section className="d-flex align-center wrap gap-larger">
                    {
                        wishlist && wishlist.map((hotel)=> <HotelCard key={hotel._id} hotel={hotel}/>)
                    }
                </section>
            </div>

        </Fragment>
    )
}