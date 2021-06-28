import { IVehicle, IVehicleAdd } from "../dto/IVehicle";
import { IVehicleType } from "../dto/IVehicleType";

const VehicleCreateEdit = (props: {vehicle: IVehicle | IVehicleAdd, handleChange: (
    target:  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)=> void, 
    vTypes: IVehicleType[] }) => {
    return (
        <div className="row">
            <div className="col-md-6">
            <h4>Vehicle</h4>

                <div className="form-group">
                    <label className="control-label" htmlFor="vehicle-make">Make</label>
                    <input
                        className="form-control"
                        type="text"
                        data-val-required="The Make field is required."
                        id="vehicle-make"
                        minLength={1}
                        maxLength={32}
                        name="Vehicle.Make"
                        value={props.vehicle.make}
                        onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="vehicle-model">Model</label>
                    <input
                        className="form-control"
                        type="text"
                        data-val="true"
                        id="vehicle-model"
                        maxLength={32}
                        name="Vehicle.Model"
                        value={props.vehicle.model}
                        onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="vehicle-date" >
                        ReleaseDate
                    </label>
                    <input
                        className="form-control"
                        type="date"
                        id="vehicle-date"
                        name="Vehicle.ReleaseDate"
                        value={props.vehicle.releaseDate}
                        onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="vehicle-reg">RegNr</label>
                    <input
                        className="form-control"
                        type="text"
                        data-val="true"
                        data-val-required="The RegNr field is required."
                        id="vehicle-reg"
                        maxLength={32}
                        name="Vehicle.RegNr"
                        value={props.vehicle.regNr}
                        onChange={(e) => props.handleChange(e.target)}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="vehicle-type-id">
                        VehicleTypeId
                        </label>
                    <select
                        className="form-control"
                        id="vehicle-type-id"
                        name="Vehicle.VehicleTypeId"
                        value={props.vehicle.vehicleTypeId}
                        onChange={(e) => props.handleChange(e.target)}
                    >
                       <option value={undefined}>--- Please select ---</option>
                            {props.vTypes.map(val =>
                                (<option key={val.id} value={val.id}>{val.vehicleTypeName}</option>))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default VehicleCreateEdit;