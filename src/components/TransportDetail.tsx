import { transform } from "typescript";
import { ITransport } from "../dto/ITransport";
import { EnumValues } from "../helpers/EnumValues";
import { Helper } from "../helpers/Helper";

const TransportDetail = (props: { transport: ITransport }) => {
    return (
        <>
            <dl className="row">
                <dt className="col-12">
                    Status
                </dt>
                <dd className="col-12">
                    {EnumValues.getEStatusType(props.transport.transportStatus != undefined ? props.transport.transportStatus : 0)}
                </dd>
                <dt className="col-12">
                    Pickup time
                </dt>
                <dd className="col-12">
                    {Helper.formatDateTime(props.transport.pickUpTime)}
                </dd>
                <dt className="col-12">
                    Estimated delivery time
                </dt>
                <dd className="col-12">
                    {Helper.formatDateTime(props.transport.estimatedDeliveryTime)}
                </dd>
            </dl>
            <h5> Pickup location</h5>

            <dl className="row">
                <dt className="col-sm-3">
                    City
                </dt>
                <dd className="col-sm-9">
                    {props.transport.pickUpLocation.city}
                </dd>
                <dt className="col-sm-3">
                    Address
                </dt>
                <dd className="col-sm-9">
                    {props.transport.pickUpLocation.address} 
                </dd>
            </dl>
        </>
    );

}

export default TransportDetail;