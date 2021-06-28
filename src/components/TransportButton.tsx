import React from "react";
import { Link } from "react-router-dom";

const TransportButton = (props: {baseUrl: string, id: string, value: string}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <Link 
                    className="d-block text-capitalize btn btn-success"
                    to={props.baseUrl + props.id}>
                        
                        {props.value}
                </Link>
            </div>
        </div>
    );
}

export default TransportButton;