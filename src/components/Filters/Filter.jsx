import { PriceRange,RoomsAndBeds,PropertyType,Ratings,FreeCancel } from "./index";
import { useFilter } from "../../context";
import './Filter.css';

export const Filter=()=>{

    const {filterDispatch}=useFilter();

    const handleFilterModalClose=()=>{
        filterDispatch({
            type:"SHOW_FILTER_MODAL"
        })        
    }

    const handleClearFilterClick=()=>{
        filterDispatch({
            type:"CLEAR_ALL"
        })
    }
    return(
        <div className="filter-modal">
            <div className="filter-page shadow">
                <div className="d-flex align-center justify-space-between">
                    <span className="filter-label">Filter</span>
                    <button 
                        className="button btn-close cursor d-flex align-center justify-center"
                         onClick={handleFilterModalClose}>
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
                <PriceRange/>
                <RoomsAndBeds/>
                <PropertyType/>
                <Ratings/>
                <FreeCancel/>
                <div className="d-flex align-center justify-space-between">
                    <button className="button cursor btn-link-primary" onClick={handleClearFilterClick}>Clear All</button>
                    <button className="button cursor btn-primary btn-apply" onClick={handleFilterModalClose}>Apply</button>
                </div>
            </div>
        </div>
    )
}