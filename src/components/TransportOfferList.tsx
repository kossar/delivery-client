import { ITransportOffer } from "../dto/ITransportOffer";
import { EnumValues } from "../helpers/EnumValues";
import { Helper } from "../helpers/Helper";
import ListItem from "./ListItem";
import ListItemLink from "./ListItemLink";

const OfferListRow = (props: { transportOffer: ITransportOffer }) => {
    return ( 
        <div className="card p-4 mt-4 shadow-sm">
            <div className="row">
                <ListItem name={"Transport type"} value={EnumValues.getEType(props.transportOffer.transportType!)} />
                <ListItem name={"Price"} value={props.transportOffer.price!.toString()} />
                <ListItem name={"Free seats"} value={props.transportOffer.freeSeats!.toString()} />
                <ListItem name={"Start time"} value={Helper.formatDateTime(props.transportOffer.transportMeta.startTime)} />
                <ListItem name={"Start location"} value={props.transportOffer.transportMeta.startLocation!.city} />
                <ListItem name={"Destination"} value={props.transportOffer.transportMeta.destinationLocation!.city} />
                <ListItemLink name={"View"} uri={"/transportoffers/"} value={props.transportOffer.id}/>
            </div>
        </div>
    );
}

const TransportOfferList = (props: { transportOffers: ITransportOffer[] }) => {
    return (
        <>
            {props.transportOffers.map(transportOffer => (<OfferListRow transportOffer={transportOffer} key={transportOffer.id} />))}
        </>
    );
}

export default TransportOfferList;