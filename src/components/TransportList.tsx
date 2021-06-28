import React from "react";
import { ITransport } from "../dto/ITransport";
import { EnumValues } from "../helpers/EnumValues";
import { Helper } from "../helpers/Helper";
import ListItem from "./ListItem";
import ListEmpty from "./ListEmpty";
import ListItemLink from "./ListItemLink";


const TransportListRow = (props: { transport: ITransport }) => {
    return (
        <div className="card p-4 mt-4 shadow-sm">
            <div className="row">
                <ListItem name={"Status"} value={EnumValues.getEStatusType(props.transport.transportStatus!)} />
                <ListItem name={"Pick up time"} value={Helper.formatDateTime(props.transport.pickUpTime)} />
                <ListItem name={"Est. delivery time"} value={Helper.formatDateTime(props.transport.estimatedDeliveryTime)} />
                <ListItem name={"Start city"} value={props.transport.pickUpLocation.city} />
                <ListItemLink name={"View"} uri={"/transports/"} value={props.transport.id}/>
            </div>
        </div>
    );
}

const TransportList = (props: { transports: ITransport[] }) => {
    return (
        <>
            {props.transports.length > 0 ? props.transports.map(
                transport => (<TransportListRow transport={transport} key={transport.id} />
                    )) : 
                    <ListEmpty />
            }
        </>
    );
}

export default TransportList;