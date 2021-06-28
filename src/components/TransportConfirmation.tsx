import { ITransport, ITransportAdd } from "../dto/ITransport";

const TransportConfirmation = (props: {transport: ITransportAdd | ITransport, handleChange: (
    target:  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, name?: string) => void}) => {
    
    return (
        <>
            <div className="form-group">
                <label className="control-label"
                    htmlFor="t-pickup-time">
                    Pickup time
            </label>
                <input
                    className="form-control"
                    type="datetime-local" id="t-pickup-time" name="Transport.PickUpTime"
                    value={props.transport.pickUpTime}
                    onChange={(e) => props.handleChange(e.target)} />
            </div>
            
            <div className="form-group">
                <label className="control-label" htmlFor="est-delivery">Estimated delivery time</label>
                <input
                    className="form-control"
                    type="datetime-local" 
                    id="est-delivery"
                    name="Transport.EstimatedDeliveryTime"
                    value={props.transport.estimatedDeliveryTime}
                    onChange={(e) => props.handleChange(e.target)} />
            </div>




        </>
    );
}

export default TransportConfirmation;