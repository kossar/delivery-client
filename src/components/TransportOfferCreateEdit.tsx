import React from "react";
import { ISaveTransportOfferProps } from "../containers/transportoffers/TransportOfferCreate";
import { startLocationString, destinationLocationString } from "../helpers/C";
import { EnumValues } from "../helpers/EnumValues";
import Loc from "./Loc";
import VehicleCreateEdit from "./VehicleCreateEdit";

const TransportOfferCreateEdit = (props: ISaveTransportOfferProps) => {
    const enumValues: number[] = EnumValues.getTransportTypeValues();
    return (
        <form method="post">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label"
                            htmlFor="start-time">Start time</label>
                        <input
                            className="form-control"
                            type="datetime-local"
                            id="start-time"
                            name="start-time"
                            value={props.startTime} onChange={(e) => props.handleChange(e.target)} />

                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="transport-offer-info">
                            Additional info</label>
                        <textarea
                            className="form-control"
                            id="transport-offer-info"
                            maxLength={1024}
                            name="TransportOffer.Info"
                            value={props.transportOffer.transportOfferInfo}
                            onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label"
                            htmlFor="transport-type">
                            Transport type
                </label>
                        <select
                            className="form-control"
                            id="transport-type"
                            name="transport-type"
                            value={props.transportOffer.transportType} onChange={(e) => props.handleChange(e.target)}>
                            <option value={undefined}>--- Please select ---</option>
                            {enumValues.map(val =>
                                (<option key={val} value={val}>{EnumValues.getEType(val)}</option>))}

                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="transport-offer-price">Price</label>
                        <input
                            className="form-control"
                            type="number"
                            id="transport-offer-price"
                            name="TransportOffer.Price"
                            value={props.transportOffer.price}
                            onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="transport-offer-load">Available load capacity</label>
                        <input
                            className="form-control"
                            type="number"
                            id="transport-offer-load"
                            name="TransportOffer.AvailableLoadCapacity"
                            value={props.transportOffer.availableLoadCapacity}
                            onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="unit-id">Load capacity unit</label>
                        <select
                            className="form-control"
                            data-val="true"
                            data-val-required="The Unit field is required."
                            id="unit-id"
                            name="Offer.UnitId"
                            value={props.unitId}
                            onChange={(e) => props.handleChange(e.target)}>
                            <option value={undefined}>--- Please select ---</option>
                            {props.units.map(val =>
                                (<option key={val.id} value={val.id}>{val.unitCode}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="transport-offer-freeseats">Free seats</label>
                        <input
                            className="form-control"
                            type="number"
                            id="transport-offer-freeseats"
                            name="TransportOffer.FreeSeats"
                            value={props.transportOffer.freeSeats}
                            onChange={(e) => props.handleChange(e.target)}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h4>Start Location</h4>
                    <Loc location={props.startLocation} handleChange={props.handleChange} locName={startLocationString} />
                </div>
                <div className="col-md-6">
                    <h4>Destination Location</h4>
                    <Loc location={props.destinationLocation} handleChange={props.handleChange} locName={destinationLocationString} />
                </div>
            </div>
            <hr/>
            
            <VehicleCreateEdit 
                vehicle={props.vehicle}
                vTypes={props.vehicleTypes}
                handleChange={props.handleChange}
                />
        </form>
    );
}

export default TransportOfferCreateEdit;