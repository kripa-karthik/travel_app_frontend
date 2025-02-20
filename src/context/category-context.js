import { useState,createContext,useContext} from "react";

const initialValue="";

const CategoryContext=createContext(initialValue);

const CategoryProvider=({children})=>{

    const [hotelCategory,setHotelCategory]=useState(initialValue);

    return(
        <CategoryContext.Provider value={{hotelCategory,setHotelCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

const useCategory=()=> useContext(CategoryContext);

export {useCategory,CategoryProvider};