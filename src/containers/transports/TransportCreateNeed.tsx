import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loc from "../../components/Loc";
import TransportConfirmation from "../../components/TransportConfirmation";
import TransportNeedCreateEdit from "../../components/TransportNeedCreateEdit";
import TransportOfferDetailView from "../../components/TransportOfferDetailView"
import { AppContext } from "../../context/AppContext";
import { ILocation } from "../../dto/ILocation";
import { ITransport } from "../../dto/ITransport";
import { ITransportMetaAdd } from "../../dto/ITransportMeta";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { ITransportOffer } from "../../dto/ITransportOffer";
import { startLocationString, destinationLocationString, pickUpLocationString } from "../../helpers/C";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportCreateNeed = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);
    const [addNew, setAddNew] = useState(false);

    const [transportNeedAdd, setTransportNeed] = useState(CreateInitialObjects.initTransportNeedAdd());
    const [startLocation, setStartLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [destinationLocation, setDestinationLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [time, setTime] = useState(new Date(Date.now()).toLocaleString());

    const [pickUpLocation, setPickUpLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [transportOffer, setTransportOffer] = useState(CreateInitialObjects.initTransportOffer());
    const [userNeeds, setUserNeeds] = useState([] as ITransportNeed[]);

    const [transportAdd, setTransportAdd] = useState(CreateInitialObjects.initTransportAdd());


    const loadData = async () => {
        let userNeedResult = await BaseService.getAll<ITransportNeed>('TransportNeeds/user', appState.auth.token!);
        if (userNeedResult.ok && userNeedResult.data) {
            setUserNeeds(userNeedResult.data);
        }

        let result = await BaseService.get<ITransportOffer>('TransportOffers/', id);
        console.log(result);

        if (result.ok && result.data) {
            setTransportOffer(result.data);
        }
    }

    useEffect(() => {
        if (!appState.auth.token) {
            goToPreviousPath();
        }
        loadData();
    }, []);

    const history = useHistory();
    const goToPreviousPath = () => {
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
            if (name === pickUpLocationString) {
                setPickUpLocation({ ...pickUpLocation, country: target.value });
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
            if (name === pickUpLocationString) {
                setPickUpLocation({ ...pickUpLocation, city: target.value });
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
            if (name === pickUpLocationString) {
                setPickUpLocation({ ...pickUpLocation, address: target.value });
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
            if (name === pickUpLocationString) {
                setPickUpLocation({ ...pickUpLocation, locationInfo: target.value });
                return;
            }
        }

        if (target.id === 'need-id') {
            setTransportAdd({ ...transportAdd, transportNeedId: target.value })
        }
        if (target.id === 'est-delivery') {
            setTransportAdd({ ...transportAdd, estimatedDeliveryTime: target.value })
        }
        if (target.id === 't-pickup-time') {
            setTransportAdd({ ...transportAdd, pickUpTime: target.value })
        }

    }

    const save = async () => {
        console.log(transportNeedAdd);
        console.log(startLocation);
        console.log(destinationLocation);
        console.log(time);

        console.log(id);
        setTransportAdd({ ...transportAdd, transportOfferId: id });
        transportAdd.transportOfferId = id; // ?????????????????????????????????????
        console.log("transport in save start");
        console.log(transportAdd);
        let transportMetaAdd: ITransportMetaAdd = CreateInitialObjects.initTransportMetaAdd();
        transportMetaAdd.startTime = time;

        if (addNew) {
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
                setTransportAdd({ ...transportAdd, transportNeedId: transportMetaResult.data!.id });
            }
        }
        const pickUpLocationResult = await BaseService.post<ILocation>(pickUpLocation, 'Locations', appState.auth.token!);
        if (pickUpLocationResult.ok && pickUpLocationResult.data) {
            transportAdd.pickUpLocationId = pickUpLocationResult.data.id;
        }
        console.log(transportAdd);
        const transportResult = await BaseService.post<ITransport>(transportAdd, 'Transports', appState.auth.token!);
        if (transportResult.ok && transportResult.data) {
            history.push('/transports/' + transportResult.data.id);
        }
        console.log(transportResult);


    }
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row mt-2 mb-2">
                        <input type="button" className="btn btn-primary" value={addNew ? "Select from existing needs" : "Add new"} onClick={() => setAddNew(!addNew)} />
                    </div>
                    {addNew ? (
                        <TransportNeedCreateEdit
                            transportNeed={transportNeedAdd}
                            startLocation={startLocation}
                            destinationLocation={destinationLocation}
                            startTime={time}
                            handleChange={handleChange}
                        />) :
                        (
                            <div className="row">
                                <div className="form-group">
                                    <label
                                        className="control-label"
                                        htmlFor="need-id">
                                        Select from previous offers
                                </label>
                                    <select
                                        className="form-control"
                                        id="need-id"
                                        name="need-id"
                                        value={transportAdd.transportNeedId} onChange={(e) => handleChange(e.target)}>
                                        <option value={undefined}>--- Please select ---</option>
                                        {userNeeds.map(val =>
                                            (<option key={val.id} value={val.id}>{val.transportMeta.startTime} {val.transportMeta.startLocation?.city} {val.transportMeta.destinationLocation?.city}</option>))}

                                    </select>
                                </div>
                            </div>
                        )

                    }
                </div>

                <div className="col-lg-6">
                    <h4>Transport offer to request transport</h4>
                    <TransportOfferDetailView transportOffer={transportOffer} />
                    <hr />
                    <h4>Confirm startlocation and time</h4>
                    <TransportConfirmation transport={transportAdd} handleChange={handleChange} />
                    <Loc location={pickUpLocation} handleChange={handleChange} locName={pickUpLocationString} />
                    <div className="row mt-2 mb-2">
                        <input type="button" className="btn btn-primary" value={"Save and submit"} onClick={save} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default TransportCreateNeed;