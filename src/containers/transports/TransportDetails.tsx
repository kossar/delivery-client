import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransportDetail from "../../components/TransportDetail";
import TransportNeedDetailView from "../../components/TransportNeedDetailView";
import TransportOfferDetailView from "../../components/TransportOfferDetailView";
import { AppContext } from "../../context/AppContext";
import { IParcel } from "../../dto/IParcel";
import { ITransport } from "../../dto/ITransport";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { ITransportOffer } from "../../dto/ITransportOffer";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { Helper } from "../../helpers/Helper";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportDetails = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [transport, setTransport] = useState(CreateInitialObjects.initTransport());
    const [transportNeed, setTransportNeed] = useState(CreateInitialObjects.initTransportNeed());
    const [transportOffer, setTransportOffer] = useState(CreateInitialObjects.initTransportOffer());
    const [parcels, setParcels] = useState([] as IParcel[]);

    const loadData = async () => {
        let transportRes = await BaseService.get<ITransport>('Transports/', id, appState.auth.token!);
        if (transportRes.ok && transportRes.data) {
            setTransport(transportRes.data);
            console.log("trasport response");
            console.log(transportRes.data);
        }

        let ids: string[] = [];
        let transportNeedRes = await BaseService.get<ITransportNeed>('TransportNeeds/',  transportRes.data!.transportNeedId);
        if (transportNeedRes.ok && transportNeedRes.data) {
            setTransportNeed(transportNeedRes.data);
            ids = transportNeedRes.data.parcelIds;
            console.log("trasport need response");
            console.log(transportNeedRes.data);
        }

        let transportOfferRes = await BaseService.get<ITransportOffer>('TransportOffers/',  transportRes.data!.transportOfferId);
        console.log(transportOfferRes);

        if (transportOfferRes.ok && transportOfferRes.data) {
            setTransportOffer(transportOfferRes.data);
            console.log("trasport offer response");
            console.log(transportOfferRes.data);
        }

        //ids.forEach(id => loadParcels(id));
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
        loadData();
    }, []);

    return (
        <div className="row">
            <div className="col-12 col-lg-5">
                <TransportDetail transport={transport} />
            </div>
            <div className="col-12 col-lg-7">
                {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) === transportNeed.appUserId ?
                    (<h4 className="text-info"> My Transport need</h4>) : (<h4>Transport need</h4>)}

                <div className="row">
                    <TransportNeedDetailView transportNeed={transportNeed} parcels={parcels} />
                </div>
                <hr />
                {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) === transportOffer.appUserId ?
                    (<h4 className="text-info"> My Transport offer</h4>) : (<h4>Transport offer</h4>)}
                <div className="row">
                    <TransportOfferDetailView transportOffer={transportOffer} />
                </div>
            </div>
        </div>
    );
}

export default TransportDetails;