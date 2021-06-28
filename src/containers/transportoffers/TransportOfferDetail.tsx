import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import TransportButton from "../../components/TransportButton";
import TransportOfferDetailView from "../../components/TransportOfferDetailView";
import { AppContext } from "../../context/AppContext";
import { ITransportOffer } from "../../dto/ITransportOffer";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { Helper } from "../../helpers/Helper";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportOfferDetail = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [transportOffer, setTransportOffer] = useState(CreateInitialObjects.initTransportOffer());


    const loadData = async () => {
        let result = await BaseService.get<ITransportOffer>('TransportOffers/', id);
        console.log(result);

        if (result.ok && result.data) {
            setTransportOffer(result.data);
        }
    }

    useEffect(() => {
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

    console.log(id);
    return (
        <>
            <h1>Transport offer</h1>
            <TransportOfferDetailView transportOffer={transportOffer}/>
            {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) !== transportOffer.appUserId ?
                    (<TransportButton baseUrl={"/transports/create-need/"} id={transportOffer.id} value={"Request transport"}/>) : null}
            <div>
                {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) === transportOffer.appUserId ?
                    (<><Link to={'/transportoffers/edit/' + transportOffer.id}>Edit</Link> | </>) : null}
                <Link to="#" onClick={() => goToPreviousPath()}>Back to list</Link>
            </div>
        </>
    );
}

export default TransportOfferDetail;