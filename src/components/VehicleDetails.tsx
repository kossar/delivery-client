import { IVehicle } from "../dto/IVehicle";

const VehicleDetails = (props: { vehicle: IVehicle }) => {
    return (
        <dl className="row">
            <dt className="col-sm-3">
                Vehicle
            </dt>
            <dd className="col-sm-9">
                {props.vehicle.make} {props.vehicle.model}
            </dd>
            <dt className="col-sm-2">
                Age
            </dt>
            <dd className="col-sm-10">
                {props.vehicle.age}
            </dd>
        </dl>
    );
}

export default VehicleDetails;