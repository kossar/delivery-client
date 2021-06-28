import { AppContext } from "../../context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { BaseService } from "../../services/BaseService";
import { ITransportOffer } from "../../dto/ITransportOffer";
import TransportOfferList from "../../components/TransportOfferList";

const TransportOffersIndex = () => {
    const appState = useContext(AppContext);

    const [transportOffers, setTransportOffers] = useState([] as ITransportOffer[]);

    const loadData = async () => {
        let result = await BaseService.getAll<ITransportOffer>('TransportOffers');
        console.log(result);

        if (result.ok && result.data) {
            setTransportOffers(result.data)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log(appState);

    return (
        <>
            <h1 className="text-center mt-5 mb-5">Transport offers</h1>

            <TransportOfferList transportOffers={transportOffers} />
        </>

    );
}

export default TransportOffersIndex;