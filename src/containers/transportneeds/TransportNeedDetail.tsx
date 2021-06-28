import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import TransportButton from "../../components/TransportButton";
import TransportNeedDetailView from "../../components/TransportNeedDetailView";
import { AppContext } from "../../context/AppContext";
import { IParcel } from "../../dto/IParcel";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { Helper } from "../../helpers/Helper";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportNeedDetail = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [transportNeed, setTransportNeed] = useState(CreateInitialObjects.initTransportNeed());

    const [parcels, setParcels] = useState([] as IParcel[]);

    const loadData = async () => {
        let result = await BaseService.get<ITransportNeed>('TransportNeeds/', id);
        console.log(result);

        let ids: string[] = [];
        if (result.ok && result.data) {
            setTransportNeed(result.data);
            ids = result.data.parcelIds;
        }

        ids.forEach(id => loadParcels(id));
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
            <TransportNeedDetailView transportNeed={transportNeed} parcels={parcels} />
            {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) !== transportNeed.appUserId ?
                    (<TransportButton baseUrl={"/transports/create-offer/"} id={transportNeed.id} value={"Offer transport"}/>) : null}
            <div>
                {appState.auth.token && Helper.getUserIdFromToken(appState.auth.token) === transportNeed.appUserId ?
                    (<><Link to={'/transportneeds/edit/' + transportNeed.id}>Edit</Link> | </>) : null}
                <Link to="#" onClick={() => goToPreviousPath()}>Back to list</Link>
            </div>
        </>
    );
}

export default TransportNeedDetail;