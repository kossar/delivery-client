import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import TransportNeedCreateEdit from "../../components/TransportNeedCreateEdit";
import { AppContext } from "../../context/AppContext";
import {  ITransportNeed } from "../../dto/ITransportNeed";
import { startLocationString, destinationLocationString} from "../../helpers/C";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportNeedEdit = () => {
    const { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const history = useHistory();
    const [transportNeed, setTransportNeed] = useState(CreateInitialObjects.initTransportNeed());
    const [startLocation, setStartLocation] = useState(CreateInitialObjects.initLocation());
    const [destinationLocation, setDestinationLocation] = useState(CreateInitialObjects.initLocation());
    const [time, setTime] = useState(new Date(Date.now()).toLocaleString());

    useEffect(() => {
        if (appState.auth.token === null) {
            navigete();
        }
        loadData();
    },[]);

    const navigete = () => {
        if (history.length > 0) {
            history.goBack()
        } else {
            history.push('/');
        }

    }
    const loadData = async () => {
        let result = await BaseService.get<ITransportNeed>('TransportNeeds/', id);
        console.log(result);

        //let ids: string[] = [];
        if (result.ok && result.data) {
            console.log(result.data);
            setTransportNeed(result.data);
            setStartLocation(result.data.transportMeta.startLocation!);
            setDestinationLocation(result.data.transportMeta.destinationLocation!);
            setTime(result.data.transportMeta.startTime);
        }

        //ids.forEach(id => loadParcels(id));
    }



    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, name?: string) => {
        if (target.id === 'transport-need-info') {
            setTransportNeed({ ...transportNeed, transportNeedInfo: target.value });
            return;
        }

        if (target.id === 'transport-type') {
            setTransportNeed({ ...transportNeed, transportType: parseInt(target.value) });
            return;
        }

        if (target.id === 'person-count') {
            setTransportNeed({ ...transportNeed, personCount: parseInt(target.value) });
            return;
        }

        if (target.id === 'start-time') {
            setTime(target.value);
            return;
        }

        if (target.id === 'country') {
            if (name === startLocationString) {
                setStartLocation({ ...startLocation, country: target.value });
                return;
            }
            if (name === destinationLocationString) {
                setDestinationLocation({ ...destinationLocation, country: target.value });
                return;
            }
        }
        if (target.id === 'city') {
            if (name === startLocationString) {
                setStartLocation({ ...startLocation, city: target.value });
                return;
            }
            if (name === destinationLocationString) {
                setDestinationLocation({ ...destinationLocation, city: target.value });
                return;
            }
        }
        if (target.id === 'address') {
            if (name === startLocationString) {
                setStartLocation({ ...startLocation, address: target.value });
                return;
            }
            if (name === destinationLocationString) {
                setDestinationLocation({ ...destinationLocation, address: target.value });
                return;
            }
        }
        if (target.id === 'location-info') {
            if (name === startLocationString) {
                setStartLocation({ ...startLocation, locationInfo: target.value });
                return;
            }
            if (name === destinationLocationString) {
                setDestinationLocation({ ...destinationLocation, locationInfo: target.value });
                return;
            }
        }
    }
    const save = async () => {
        console.log(transportNeed);
        console.log(startLocation);
        console.log(destinationLocation);
        console.log(time);

        transportNeed.transportMeta.startTime = time;
        transportNeed.transportMeta.startLocation = startLocation;
        transportNeed.transportMeta.destinationLocation = destinationLocation;
        const transportNeedResult = await BaseService.put<ITransportNeed>('TransportNeeds/', transportNeed.id, transportNeed ,appState.auth.token!);
        if (transportNeedResult.ok) {
            navigete();
        }
    }
    return (
        <>
            <h1>Create</h1>

            <h4>Transport need</h4>
            <hr />

            <TransportNeedCreateEdit
                transportNeed={transportNeed}
                startLocation={startLocation}
                destinationLocation={destinationLocation}
                startTime={time}
                handleChange={handleChange}
            />
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" onClick={save}/>
            </div>
            <div>
                <Link to="/TransportNeeds">Back to list</Link>
            </div>
        </>
    );
}

export default TransportNeedEdit;