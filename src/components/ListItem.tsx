const ListItem = (props: { name: string, value: string }) => {
    return (
        <div className="col">
            <h6 className="text-center"> {props.name} </h6>
            <div className="card-body">
                <p className="card-text text-center"> {props.value}</p>
            </div>
        </div>
    );
}

export default ListItem;