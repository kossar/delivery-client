import { ITransportNeed } from "../dto/ITransportNeed";
import { EnumValues } from "../helpers/EnumValues";
import { Helper } from "../helpers/Helper";
import ListItem from "./ListItem";
import ListItemLink from "./ListItemLink";

const ListRow = (props: { transportNeed: ITransportNeed }) => {
    return (
        <div className="card p-4 mt-4 shadow-sm">
            <div className="row">
                <ListItem name={"Transport type"} value={EnumValues.getEType(props.transportNeed.transportType!)} />
                <ListItem name={"Person count"} value={props.transportNeed.personCount!.toString()} />
                <ListItem name={"Start time"} value={Helper.formatDateTime(props.transportNeed.transportMeta.startTime)} />
                <ListItem name={"Start location"} value={props.transportNeed.transportMeta.startLocation!.city} />
                <ListItem name={"Destination"} value={props.transportNeed.transportMeta.destinationLocation!.city} />
                <ListItemLink name={"View"} uri={"/transportneeds/"} value={props.transportNeed.id}/>
            </div>
        </div>
    );
}

const TransportNeedList = (props: { transportNeeds: ITransportNeed[] }) => {
    return (
        <>
            {props.transportNeeds.map(transportNeed => (<ListRow transportNeed={transportNeed} key={transportNeed.id} />))}
        </>
    );
}

export default TransportNeedList;