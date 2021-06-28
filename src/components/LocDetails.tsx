import { ILocation } from "../dto/ILocation";

const LocDetails = (props: {location: ILocation}) => {
    return (
        <dl className="row">
            <dt className="col-sm-3">
                Country
            </dt>
            <dd className="col-sm-9">
                {props.location.country}
            </dd>
            <dt className="col-sm-3">
                City
            </dt>
            <dd className="col-sm-9">
                {props.location.city}
            </dd>
            <dt className="col-sm-3">
                Address
            </dt>
            <dd className="col-sm-9">
                {props.location.address}
            </dd>
        </dl>
    );
}

export default LocDetails;