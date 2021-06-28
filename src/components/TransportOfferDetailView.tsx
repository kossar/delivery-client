
import { ITransportOffer } from "../dto/ITransportOffer";
import { EnumValues } from "../helpers/EnumValues";
import LocDetails from "./LocDetails";
import VehicleDetails from "./VehicleDetails";

const TransportOfferDetailView = (props: { transportOffer: ITransportOffer }) => {
    const time = props.transportOffer.transportMeta.startTime;
    console.log(props.transportOffer);
    return (
        <div>
            <dl className="row">
                <dt className="col-sm-2">Info</dt>
                <dd className="col-sm-10">{props.transportOffer.transportOfferInfo}</dd>
                <dt className="col-sm-2">Transport type</dt>
                <dd className="col-sm-10"> {EnumValues.getEType(props.transportOffer.transportType!)}</dd>
                <dt className="col-sm-2"> Price</dt>
                <dd className="col-sm-10">{props.transportOffer.price}</dd>
                <dt className="col-sm-2">Available load capacity</dt>
                <dd className="col-sm-10">{props.transportOffer.availableLoadCapacity}</dd>
                <dt className="col-sm-2">Start time</dt>
                <dd className="col-sm-10">{new Date(time).toLocaleDateString()} {new Date(time).toLocaleTimeString()}</dd >
                
            </dl>
            <hr/>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h4>Start location</h4>
                    <LocDetails location={props.transportOffer.transportMeta.startLocation!}/>
                </div>
                <div className="col-12 col-md-6">
                    <h4>Destination location</h4>
                    <LocDetails location={props.transportOffer.transportMeta.startLocation!}/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h4>Vehicle</h4>
                    <VehicleDetails vehicle={props.transportOffer.vehicle!}/>
                </div>
            </div>
        </div>

    );
}

export default TransportOfferDetailView;