import './HotelImages.css';

export const HotelImages=({singleHotel})=>{
    const {image, imageArr}=singleHotel;
    return(
        <div className="hotel-image-container d-flex gap-sm">
            <div className="primary-image-container">
                <img className="hotel-img primary-img" src={image} alt="primary"></img>
            </div>
            <div className="d-flex wrap gap-sm">
                {
                    imageArr && imageArr.map(image=><img key={image} className="hotel-img" src={image} alt="hotel"/>)
                }
            </div>

        </div>
        
    )
}