import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loc from "../../components/Loc";
import TransportConfirmation from "../../components/TransportConfirmation";
import TransportNeedDetailView from "../../components/TransportNeedDetailView";
import TransportOfferCreateEdit from "../../components/TransportOfferCreateEdit";
import { AppContext } from "../../context/AppContext";
import { ILocation } from "../../dto/ILocation";
import { IParcel } from "../../dto/IParcel";
import { ITransport } from "../../dto/ITransport";
import { ITransportMetaAdd } from "../../dto/ITransportMeta";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { ITransportOffer } from "../../dto/ITransportOffer";
import { IUnit } from "../../dto/IUnit";
import { IVehicle } from "../../dto/IVehicle";
import { IVehicleType } from "../../dto/IVehicleType";
import { startLocationString, destinationLocationString, pickUpLocationString } from "../../helpers/C";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportCreateOffer = () => {
    const { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [addNew, setAddNew] = useState(false);
    const [transportNeed, setTransportNeed] = useState(CreateInitialObjects.initTransportNeed());
    const [parcels, setParcels] = useState([] as IParcel[]);
    const [userOffers, setUserOffers] = useState([] as ITransportOffer[]);

    const [transportOfferAdd, setTransportOffer] = useState(CreateInitialObjects.initTransportOfferAdd());
    const [startLocation, setStartLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [destinationLocation, setDestinationLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [pickUpLocation, setPickUpLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [time, setTime] = useState(new Date(Date.now()).toLocaleString());
    const [units, setUnits] = useState([] as IUnit[]);
    const [unitId, setUnitId] = useState("");
    const [vehicle, setVehicle] = useState(CreateInitialObjects.initVehicleAdd());
    const [vehicleTypes, setVehicleTypes] = useState([] as IVehicleType[]);

    const [transportAdd, setTransportAdd] = useState(CreateInitialObjects.initTransportAdd());


    const loadData = async () => {
        let userOfferResult = await BaseService.getAll<ITransportOffer>('TransportOffers/user', appState.auth.token!);
        if (userOfferResult.ok && userOfferResult.data) {
            setUserOffers(userOfferResult.data);
        }

        let result = await BaseService.get<ITransportNeed>('TransportNeeds/', id);
        console.log(result);

        let ids: string[] = [];
        if (result.ok && result.data) {
            setTransportNeed(result.data);
            ids = result.data.parcelIds;
        }

        ids.forEach(id => loadParcels(id));

        let unitres = await BaseService.getAll<IUnit>('Units');
        console.log(result);

        if (unitres.ok && unitres.data) {
            setUnits(unitres.data!);
        }

        let vTypesResult = await BaseService.getAll<IVehicleType>('VehicleTypes');
        console.log(result);

        if (vTypesResult.ok && vTypesResult.data) {
            setVehicleTypes(vTypesResult.data);
        }
    }

    const loadParcels = async (id: string) => {
        let result = await BaseService.get<IParcel>('Parcels/', id);
        console.log('loadparcels');

        if (result.ok && result.data) {
            console.log(result);
            setParcels([...parcels, result.data])
        }
    }

    useEffect(() => {
        if(!appState.auth.token){
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
    const save = async () => {
        // add transportneed id to transport
        setTransportAdd({ ...transportAdd, transportNeedId: id });
        transportOfferAdd.unitId = unitId;
        console.log(transportOfferAdd);
        console.log(startLocation);
        console.log(destinationLocation);
        console.log(time);


        console.log(vehicle);
        if (addNew) {
            let transportMetaAdd: ITransportMetaAdd = CreateInitialObjects.initTransportMetaAdd();
            transportMetaAdd.startTime = time;
            console.log('adding start loc');
            const startLocationResult = await BaseService.post<ILocation>(startLocation, 'Locations', appState.auth.token!);
            if (startLocationResult.ok && startLocationResult.data) {
                transportMetaAdd.startLocationId = startLocationResult.data.id;
            }
            console.log('adding start loc')
            const destinationLocationResult = await BaseService.post<ILocation>(destinationLocation, 'Locations', appState.auth.token!);
            if (startLocationResult.ok && destinationLocationResult.data) {
                transportMetaAdd.destinationLocationId = destinationLocationResult.data.id;
            }

            const transportMetaResult = await BaseService.post<ILocation>(transportMetaAdd, 'TransportMeta', appState.auth.token!);
            if (transportMetaResult.ok && transportMetaResult.data) {
                transportOfferAdd.transportMetaId = transportMetaResult.data.id;
            }

            const vehicleResult = await BaseService.post<IVehicle>(vehicle, 'Vehicles', appState.auth.token!);
            if (vehicleResult.ok && vehicleResult.data) {
                transportOfferAdd.vehicleId = vehicleResult.data.id;
            }

            const transportOfferResult = await BaseService.post<ITransportOffer>(transportOfferAdd, 'TransportOffers', appState.auth.token!);
            if (transportOfferResult.ok && transportOfferResult.data) {
                console.log('all added');
                transportAdd.transportOfferId = transportOfferResult.data.id;
            }
        }
        console.log(transportAdd);
        transportAdd.transportStatus = 1;
        const pickUpLocationResult = await BaseService.post<ILocation>(pickUpLocation, 'Locations', appState.auth.token!);
        if (pickUpLocationResult.ok && pickUpLocationResult.data) {
            transportAdd.pickUpLocationId = pickUpLocationResult.data.id;
        }

        const transportResult = await BaseService.post<ITransport>(transportAdd, 'Transports', appState.auth.token!);
        if (transportResult.ok && transportResult.data) {
            history.push('/transports/' + transportResult.data.id);
        }
        console.log(transportResult);


    }
    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, name?: string) => {
        if (target.id === 'transport-offer-info') {
            setTransportOffer({ ...transportOfferAdd, transportOfferInfo: target.value });
            return;
        }

        if (target.id === 'transport-type') {
            setTransportOffer({ ...transportOfferAdd, transportType: parseInt(target.value) });
            return;
        }

        if (target.id === 'transport-offer-price') {
            setTransportOffer({ ...transportOfferAdd, price: parseInt(target.value) });
            return;
        }
        if (target.id === 'transport-offer-load') {
            setTransportOffer({ ...transportOfferAdd, availableLoadCapacity: parseInt(target.value) });
            return;
        }
        if (target.id === 'transport-offer-freeseats') {
            setTransportOffer({ ...transportOfferAdd, freeSeats: parseInt(target.value) });
            return;
        }
        if (target.id === 'unit-id') {
            setUnitId(target.value);
            return;
        }

        if (target.id === 'start-time') {
            setTime(target.value);
            return;
        }

        if (target.id === 'vehicle-make') {
            setVehicle({ ...vehicle, make: target.value });
            return;
        }
        if (target.id === 'vehicle-model') {
            setVehicle({ ...vehicle, model: target.value });
            return;
        }
        if (target.id === 'vehicle-date') {
            setVehicle({ ...vehicle, releaseDate: target.value });
            return;
        }
        if (target.id === 'vehicle-reg') {
            setVehicle({ ...vehicle, regNr: target.value });
            return;
        }
        if (target.id === 'vehicle-type-id') {
            setVehicle({ ...vehicle, vehicleTypeId: target.value });
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
        if (target.id === 'offer-id') {
            setTransportAdd({ ...transportAdd, transportOfferId: target.value })
        }
        if (target.id === 'est-delivery') {
            setTransportAdd({ ...transportAdd, estimatedDeliveryTime: target.value })
        }
        if (target.id === 't-pickup-time') {
            setTransportAdd({ ...transportAdd, pickUpTime: target.value })
        }

    }
    return (
        <>
            <div className="row">
                <div className="col-lg-5">
                    <h4>Offer transport to this transport need</h4>
                    <TransportNeedDetailView transportNeed={transportNeed} parcels={parcels} />
                    <hr />
                    <h4>Confirm startlocation and time</h4>
                    <TransportConfirmation transport={transportAdd} handleChange={handleChange} />
                    <Loc location={pickUpLocation} handleChange={handleChange} locName={pickUpLocationString} />
                </div>

                <hr />
                <div className="col-lg-7">
                    <div className="row mt-2 mb-2">
                        <input type="button" className="btn btn-primary" value={addNew ? "Select from existing offers" : "Add new"} onClick={() => setAddNew(!addNew)} />
                    </div>

                    {addNew ? (
                        <TransportOfferCreateEdit
                            transportOffer={transportOfferAdd}
                            startLocation={startLocation}
                            destinationLocation={destinationLocation}
                            startTime={time}
                            units={units}
                            unitId={unitId}
                            vehicle={vehicle}
                            vehicleTypes={vehicleTypes}
                            handleChange={handleChange}
                        />) :

                        (
                            <div className="row">
                                <div className="form-group">
                                    <label
                                        className="control-label"
                                        htmlFor="offer-id">
                                        Select from previous offers
                                </label>
                                    <select
                                        className="form-control"
                                        id="offer-id"
                                        name="transport-type"
                                        value={transportAdd.transportOfferId} onChange={(e) => handleChange(e.target)}>
                                        <option value={undefined}>--- Please select ---</option>
                                        {userOffers.map(val =>
                                            (<option key={val.id} value={val.id}>{val.transportMeta.startTime} {val.transportMeta.startLocation?.city} {val.transportMeta.destinationLocation?.city}</option>))}

                                    </select>
                                </div>
                            </div>)}
                </div>
            </div>
            <div className="row mt-2 mb-2">
                <input type="button" className="btn btn-primary" value={"Save and submit"} onClick={save} />
            </div>
        </>
    );
}

export default TransportCreateOffer;