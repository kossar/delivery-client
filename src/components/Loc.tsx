import { ILocation, ILocationAdd } from "../dto/ILocation";

const Loc = (props: {location: ILocationAdd | ILocation, handleChange: (
    target:  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, name?: string) => void,
    locName: string}
     ) => {
    return(

        <div className="col">
        <div className="form-group">
            <label className="control-label" htmlFor="country">Country</label>
            <input
                className="form-control"
                type="text"
                id="country"
                maxLength={64}
                name="country"
                value={props.location.country}
                onChange={(e) => props.handleChange(e.target, props.locName)}
            />
        </div>
        <div className="form-group">
            <label className="control-label" htmlFor="city">City</label>
            <input
                className="form-control"
                type="text"
                id="city"
                maxLength={64}
                name="city"
                value={props.location.city}
                onChange={(e) => props.handleChange(e.target, props.locName)}
            />
        </div>
        <div className="form-group">
            <label className="control-label" htmlFor="address">Address</label>
            <input
                className="form-control"
                type="text"
                data-val="true"
                id="address"
                maxLength={128}
                name="address"
                value={props.location.address}
                onChange={(e) => props.handleChange(e.target, props.locName)}
            />
        </div>
        <div className="form-group">
            <label className="control-label" htmlFor="location-info"
                >Additional info</label>
            <textarea
                className="form-control"
                id="location-info"
                maxLength={4096}
                name="location-info"
                value={props.location.locationInfo}
                onChange={(e) => props.handleChange(e.target, props.locName)}
            />
        </div>
    </div>
    );
}
export default Loc;