import { useFilter } from "../../../context";

const numberOfAmenties=["Any","1","2","3","4","5+"];

export const RoomsAndBeds=()=>{

    const {filterDispatch,noOfBathrooms,noOfBedrooms,noOfBeds}=useFilter();

    const handleBedroomsClick=(number)=>{
        filterDispatch({
            type:"BEDROOMS",
            payload:number
        })
    }

    const handleBathroomsClick=(number)=>{
        filterDispatch({
            type:"BATHROOMS",
            payload:number
        })
    }

    const handleBedsClick=(number)=>{
        filterDispatch({
            type:"BEDS",
            payload:number
        })
    }
    
    return(
        <div className="filter-container">
            <span className="filter-label">Rooms and Beds</span>
            <div className="d-flex align-center gap-large">
                <div className="d-flex direction-column gap">
                    <span className="span-label">Bedrooms</span>
                    <span className="span-label">Beds</span>
                    <span className="span-label">Bathrooms</span>
                </div>
                <div className="d-flex direction-column gap">
                    <div>
                        {
                            numberOfAmenties.map((number) => (
                                <span 
                                    className={`span-label amenity-count align-center 
                                    justify-center cursor on-hover ${
                                        noOfBedrooms.toString()=== number ? "selected":""
                                        }`} 
                                    key={number} onClick={()=>handleBedroomsClick(number)}>{number}</span>
                            ))
                        }
                    </div>
                    <div>
                        {
                            numberOfAmenties.map((number) => (
                                <span 
                                    className={`span-label amenity-count align-center 
                                    justify-center cursor on-hover ${
                                        noOfBathrooms.toString()=== number ? "selected":""
                                        }`}
                                    key={number} onClick={()=>handleBathroomsClick(number)}>{number}</span>
                            ))
                        }
                    </div>
                    <div>
                        {
                            numberOfAmenties.map((number) => (
                                <span 
                                    className={`span-label amenity-count align-center 
                                    justify-center cursor on-hover ${
                                        noOfBeds.toString()=== number ? "selected":""
                                        }`} 
                                    key={number} onClick={()=>handleBedsClick(number)}>{number}</span>
                            ))
                        }
                    </div>
                </div>
            </div>            
        </div>
    )

}