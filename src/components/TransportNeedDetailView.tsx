import { IParcel } from "../dto/IParcel";
import { ITransportNeed } from "../dto/ITransportNeed";
import { EnumValues } from "../helpers/EnumValues";

const TransportNeedDetailView = (props: { transportNeed: ITransportNeed, parcels: IParcel[] }) => {
    const time = props.transportNeed.transportMeta.startTime;
    return (
        <div>
            <dl className="row">
                <dt className="col-sm-2">Info</dt>
                <dd className="col-sm-10">{props.transportNeed.transportNeedInfo}</dd>
                <dt className="col-sm-2">Transport type</dt>
                <dd className="col-sm-10"> {EnumValues.getEType(props.transportNeed.transportType!)}</dd>
                <dt className="col-sm-2"> Person count</dt>
                <dd className="col-sm-10">{props.transportNeed.personCount}</dd>
                <dt className="col-sm-2">Start time</dt>
                <dd className="col-sm-10">{new Date(time).toLocaleDateString()} {new Date(time).toLocaleTimeString()}</dd >
                <dt className="col-sm-2">Start location</dt>
                <dd className="col-sm-10">
                    {props.transportNeed.transportMeta.startLocation?.city} {" "} {props.transportNeed.transportMeta.startLocation?.address}
                </dd >
                <dt className="col-sm-2">Destination location</dt>
                <dd className="col-sm-10">
                    {props.transportNeed.transportMeta.destinationLocation?.city}
                    {" "}
                    {props.transportNeed.transportMeta.destinationLocation?.address}
                </dd >
                <dt className="col-sm-2">Parcels</dt>
                <dd className="col-sm-10">{props.parcels.map(parcel => (parcel.dimensions.whl))}</dd>
            </dl>
        </div>

    );
}

export default TransportNeedDetailView;