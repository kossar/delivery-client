import React from "react";
import { Link } from "react-router-dom";

const ListItemLink = (props: { name: string, uri: string, value: string }) => {
    return (
        <div className="col">
            
            <div className="card-body">
            <Link to={props.uri + props.value}>{props.name}</Link>
            </div>
        </div>
    );
}

export default ListItemLink;