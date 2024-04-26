import { Fragment, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import { Navbar,HotelImages,HotelDetails, FinalPrice } from '../../components';
import './singleHotelPage.css'

export const SingleHotelPage=()=>{

    const { id }=useParams();
    const [singleHotel,setSingleHotel]=useState({});

    useEffect(()=>{
        (async()=>{
            try{
                const {data}=await axios.get(`https://travelin.cyclic.app/api/hotels/${id}`);
                setSingleHotel(data)

            }catch(err){
                console.log(err)
            }
        })()
    },[id]);

    const {name,state}=singleHotel;

    return(
        <Fragment>
            <Navbar route="singlehotel"/>
            <main className='single-hotel-page'>
                <p className='hotel-name-add'>
                    {name},{state}
                </p>
                <HotelImages singleHotel={singleHotel}/>
                <div className='d-flex'>
                    <HotelDetails singleHotel={singleHotel}/>
                    <FinalPrice singleHotel={singleHotel}/>
                </div>
            </main>
        </Fragment>
    )
}