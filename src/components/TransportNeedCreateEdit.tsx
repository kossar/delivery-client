import { ISaveTransportNeedProps } from "../containers/transportneeds/TransportNeedsCreate";
import { destinationLocationString, startLocationString } from "../helpers/C";
import { EnumValues } from "../helpers/EnumValues";
import Loc from "./Loc";



const TransportNeedCreateEdit = (props: ISaveTransportNeedProps) => {

    const enumValues: number[] = EnumValues.getTransportTypeValues();
    

    return (
        <form method="post">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label
                            className="control-label"
                            htmlFor="transport-need-info">
                            Additional info
                            </label>
                        <textarea
                            className="form-control"
                            id="transport-need-info"
                            maxLength={1024}
                            name="transport-need-info"
                            value={props.transportNeed.transportNeedInfo}
                            onChange={(e) => props.handleChange(e.target)} />

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
                            value={props.transportNeed.transportType} onChange={(e) => props.handleChange(e.target)}>
                            <option value={undefined}>--- Please select ---</option>
                            {enumValues.map(val =>
                                 (<option key={val} value={val}>{EnumValues.getEType(val)}</option>))}
                           
                        </select>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label"
                            htmlFor="person-count">
                            Person count
                                </label>
                        <input
                            className="form-control"
                            type="number"
                            id="person-count"
                            name="person-count"
                            value={props.transportNeed.personCount} onChange={(e) => props.handleChange(e.target)} />
                    </div>
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
                </div>
            </div>
            <hr />
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
            <hr />
        </form>
    );
}

export default TransportNeedCreateEdit;