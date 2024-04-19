import { useContext,createContext,useReducer } from "react";
import { filterReducer } from "../reducer";

const initialValue={
    isFilterModalOpen:false,
    priceRange:[300,25000],
    noOfBathrooms:"Any",
    noOfBedrooms:"Any",
    noOfBeds:"Any",
    propertyType:"Any",
    hotelRatings:1,
    isCancellable:true
}

const FilterContext=createContext(initialValue);

const FilterProvider=({children}) => {

    const [{isFilterModalOpen,priceRange,noOfBathrooms,noOfBedrooms,
        noOfBeds,propertyType,hotelRatings,isCancellable},filterDispatch]=useReducer(filterReducer,initialValue);

    return(
        <FilterContext.Provider value={{isFilterModalOpen,priceRange,noOfBathrooms,noOfBedrooms,
            noOfBeds,propertyType,hotelRatings,isCancellable,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter=()=>useContext(FilterContext);

export {useFilter,FilterProvider};