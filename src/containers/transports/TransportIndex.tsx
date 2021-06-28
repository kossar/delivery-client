import TransportList from "../../components/TransportList";
import { ITransport } from "../../dto/ITransport";
import { BaseService } from "../../services/BaseService";
import React, { useContext, useState, useEffect} from "react";
import { AppContext } from "../../context/AppContext";

const TransportIndex = () => {

    const appState = useContext(AppContext);
    
    const [waitingTNeeds, setWaitingTNeeds] = useState([] as ITransport[]);
    const [waitingTOffers, setWaitingTOffers] = useState([] as ITransport[]);
    const [pendingTNeeds, setPendingTNeeds] = useState([] as ITransport[]);
    const [pendingTOffers, setPendingTOffers] = useState([] as ITransport[]);

    const loadData = async () => {
        // Transport need requests waiting for other user action
        let pendingNeedsRes = await BaseService.getAll<ITransport>('Transports/PendingNeeds', appState.auth.token!);
        console.log(pendingNeedsRes);

        if (pendingNeedsRes.ok && pendingNeedsRes.data) {
            setPendingTNeeds(pendingNeedsRes.data)
        }

        // Transport offer requests waiting for other user action
        let pendingOffersRes = await BaseService.getAll<ITransport>('Transports/PendingOffers', appState.auth.token!);
        console.log(pendingOffersRes);

        if (pendingOffersRes.ok && pendingOffersRes.data) {
            setPendingTOffers(pendingOffersRes.data)
        }

        // Transport need requests waiting for current user action
        let waitingNeedsRes = await BaseService.getAll<ITransport>('Transports/WaitingNeeds', appState.auth.token!);
        console.log(waitingNeedsRes);

        if (waitingNeedsRes.ok && waitingNeedsRes.data) {
            setWaitingTNeeds(waitingNeedsRes.data)
        }

        // Transport offer requests waiting for other user action
        let waitingOffersRes = await BaseService.getAll<ITransport>('Transports/WaitingOffers', appState.auth.token!);
        console.log(waitingOffersRes);

        if (waitingOffersRes.ok && waitingOffersRes.data) {
            setWaitingTOffers(waitingOffersRes.data)
        }
    }

    useEffect(() => {
        loadData();
    }, []);
    
    return (
        <>
            <h4 className="mt-5">Transport needs waiting for Your action</h4>
            <TransportList transports={waitingTNeeds} />
            <h4 className="mt-5">Transport offers waiting for Your action</h4>
            <TransportList transports={waitingTOffers}/>
            <h4 className="mt-5">Pending submitted transport needs</h4>
            <TransportList transports={pendingTNeeds}/>
            <h4 className="mt-5">Pending submitted transport offers</h4>
            <TransportList transports={pendingTOffers}/>
        </>
    );
}

export default TransportIndex;
