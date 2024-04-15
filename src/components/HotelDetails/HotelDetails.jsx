import './HotelDetails.css';

export const HotelDetails = ({ singleHotel }) => {
    const {
        hostName,
        hostJoinedOn,
        numberOfBathrooms,
        numberOfBeds,
        numberOfguest,
        numberOfBedrooms,
        ameneties,
        healthAndSafety,
        houseRules
    } = singleHotel;

    return (
        <div className="hotel-details-container">
            <div className="host-details">
                <p className="host-name p"> Hosted by {hostName}, Joined on {hostJoinedOn}</p>
                <div className="span hotel-room-details">
                    Guests: &nbsp; {numberOfguest}  &nbsp; Bedrooms: &nbsp;{numberOfBedrooms}  
                     &nbsp; Beds: &nbsp;{numberOfBeds}  &nbsp; Bathrooms: &nbsp;{numberOfBathrooms} 
                </div>
            </div>
            <div className="key-features host-details">
                <RenderList items={ameneties} title="What this place offers" />
                <RenderList items={healthAndSafety} title="Health and Safety" />
                <RenderList items={houseRules} title="House Rules" />
            </div>
        </div>
    );
};

const RenderList = ({ items = [], title }) => {
    return (
        <div className="amenities-container">
            <p className="p amenities">{title}</p>
            <div className="d-flex gap-small">
                {items && items.length > 0 && items.map((item, index) => (
                    <div key={index} className="d-flex direction-column">
                        <span className="span d-flex align-center">
                        <span class="apps material-icons-outlined">format_list_bulleted</span>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

