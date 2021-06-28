import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TransportNeedCreateEdit from "../../components/TransportNeedCreateEdit";
import { AppContext } from "../../context/AppContext";
import { ILocation, ILocationAdd } from "../../dto/ILocation";
import { ITransportMetaAdd } from "../../dto/ITransportMeta";
import { ITransportNeed, ITransportNeedAdd } from "../../dto/ITransportNeed";
import { destinationLocationString, startLocationString, newOrganisationRadio, newOrganisationRadioId } from "../../helpers/C";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";

export interface ISaveTransportNeedProps {
    transportNeed: ITransportNeedAdd | ITransportNeed;
    startLocation: ILocationAdd | ILocation;
    destinationLocation: ILocationAdd | ILocation;
    startTime: string;

    handleChange: (
        target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
        name?: string
    ) => void;
}
const TransportNeedCreate = () => {
    const appState = useContext(AppContext);
    const history = useHistory();
    const [transportNeedAdd, setTransportNeed] = useState(CreateInitialObjects.initTransportNeedAdd());
    const [startLocation, setStartLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [destinationLocation, setDestinationLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [time, setTime] = useState(new Date(Date.now()).toLocaleString());

    useEffect(() => {
        if (appState.auth.token === null) {
            navigete();
        }
    });

    const navigete = () => {
        if (history.length > 0) {
            history.goBack()
        } else {
            history.push('/');
        }

    }


        const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, name?: string) => {
            if (target.id === 'transport-need-info') {
                setTransportNeed({ ...transportNeedAdd, transportNeedInfo: target.value });
                return;
            }

            if (target.id === 'transport-type') {
                setTransportNeed({ ...transportNeedAdd, transportType: parseInt(target.value) });
                return;
            }

            if (target.id === 'person-count') {
                setTransportNeed({ ...transportNeedAdd, personCount: parseInt(target.value) });
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
            console.log(transportNeedAdd);
            console.log(startLocation);
            console.log(destinationLocation);
            console.log(time);
            let transportMetaAdd: ITransportMetaAdd = CreateInitialObjects.initTransportMetaAdd();
            transportMetaAdd.startTime = time;

            const startLocationResult = await BaseService.post<ILocation>(startLocation, 'Locations', appState.auth.token!);
            if (startLocationResult.ok && startLocationResult.data) {
                transportMetaAdd.startLocationId = startLocationResult.data.id;
            }
            const destinationLocationResult = await BaseService.post<ILocation>(destinationLocation, 'Locations', appState.auth.token!);
            if (startLocationResult.ok && destinationLocationResult.data) {
                transportMetaAdd.destinationLocationId = destinationLocationResult.data.id;
            }

            const transportMetaResult = await BaseService.post<ILocation>(transportMetaAdd, 'TransportMeta', appState.auth.token!);
            if (transportMetaResult.ok && transportMetaResult.data) {
                transportNeedAdd.transportMetaId = transportMetaResult.data.id;
            }

            const transportNeedResult = await BaseService.post<ITransportNeed>(transportNeedAdd, 'TransportNeeds', appState.auth.token!);
            if (transportNeedResult.ok && transportNeedResult.data) {
                console.log('all added');
                navigete();
            }


        }
        return (
            <>
                <h1>Request transport</h1>
                <hr />

                <TransportNeedCreateEdit
                    transportNeed={transportNeedAdd}
                    startLocation={startLocation}
                    destinationLocation={destinationLocation}
                    startTime={time}
                    handleChange={handleChange}
                />
                <div className="form-group">
                    <input type="submit" value="Create" className="btn btn-primary" onClick={save} />
                </div>
                <div>
                    <Link to="/TransportNeeds">Back to list</Link>
                </div>
            </>
        );
    }

    export default TransportNeedCreate;