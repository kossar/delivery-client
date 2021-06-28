import { setuid } from "process";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TransportOfferCreateEdit from "../../components/TransportOfferCreateEdit";
import { AppContext } from "../../context/AppContext";
import { ILocation, ILocationAdd } from "../../dto/ILocation";
import { ITransportMetaAdd } from "../../dto/ITransportMeta";
import { ITransportOffer, ITransportOfferAdd } from "../../dto/ITransportOffer";
import { IUnit } from "../../dto/IUnit";
import { IVehicle, IVehicleAdd } from "../../dto/IVehicle";
import { IVehicleType } from "../../dto/IVehicleType";
import { destinationLocationString, startLocationString } from "../../helpers/C";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";

export interface ISaveTransportOfferProps {
    transportOffer: ITransportOfferAdd | ITransportOffer;
    startLocation: ILocationAdd | ILocation;
    destinationLocation: ILocationAdd | ILocation;
    vehicle: IVehicleAdd | IVehicle;
    startTime: string;
    units: IUnit[];
    unitId: string;
    vehicleTypes: IVehicleType[];

    handleChange: (
        target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
        name?: string
    ) => void;
}
const TransportOfferCreate = () => {
    const appState = useContext(AppContext);
    const history = useHistory();
    const [transportOfferAdd, setTransportOffer] = useState(CreateInitialObjects.initTransportOfferAdd());
    const [startLocation, setStartLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [destinationLocation, setDestinationLocation] = useState(CreateInitialObjects.initLocationAdd());
    const [time, setTime] = useState(new Date(Date.now()).toLocaleString());
    const [units, setUnits] = useState([] as IUnit[]);
    const [unitId, setUnitId] = useState("");
    const [vehicle, setVehicle] = useState(CreateInitialObjects.initVehicleAdd());
    const [vehicleTypes, setVehicleTypes] = useState([] as IVehicleType[]);

    const loadData = async () => {
        let result = await BaseService.getAll<IUnit>('Units');
        console.log(result);

        if (result.ok && result.data) {
            setUnits(result.data);
        }

        let vTypesResult = await BaseService.getAll<IVehicleType>('VehicleTypes');
        console.log(result);

        if (vTypesResult.ok && vTypesResult.data) {
            setVehicleTypes(vTypesResult.data);
        }
    }

    useEffect(() => {
        if (appState.auth.token === null) {
            navigete();
        }
        loadData();
    }, []);

    const navigete = () => {
        if (history.length > 0) {
            history.goBack()
        } else {
            history.push('/');
        }
    }
    const save = async () => {
        transportOfferAdd.unitId = unitId;
        console.log(transportOfferAdd);
        console.log(startLocation);
        console.log(destinationLocation);
        console.log(time);
        let transportMetaAdd: ITransportMetaAdd = CreateInitialObjects.initTransportMetaAdd();
        transportMetaAdd.startTime = time;

        console.log(vehicle);
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
            transportOfferAdd.transportMetaId = transportMetaResult.data.id;
        }

        const vehicleResult = await BaseService.post<IVehicle>(vehicle, 'Vehicles', appState.auth.token!);
        if (vehicleResult.ok && vehicleResult.data) {
            transportOfferAdd.vehicleId = vehicleResult.data.id;
        }

        const transportOfferResult = await BaseService.post<ITransportOffer>(transportOfferAdd, 'TransportOffers', appState.auth.token!);
        if (transportOfferResult.ok && transportOfferResult.data) {
            console.log('all added');
            navigete();
        }


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
    return (
        <>
            <h1 className="mb-5">Add your transport offer</h1>
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
            />
            <div className="form-group">
                <input type="submit" value="Create" className="btn btn-primary" onClick={save} />
            </div>
            <div>
                <Link to="/transportoffers">Back to list</Link>
            </div>
        </>
    );
}

export default TransportOfferCreate;