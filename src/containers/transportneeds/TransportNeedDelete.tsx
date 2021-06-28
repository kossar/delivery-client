import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import TransportNeedDetailView from "../../components/TransportNeedDetailView";
import { AppContext } from "../../context/AppContext";
import { IParcel } from "../../dto/IParcel";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { CreateInitialObjects } from "../../helpers/CreateInitialObjects";
import { BaseService } from "../../services/BaseService";
import { IRouteId } from "../../types/IRouteId";

const TransportNeedDelete = () => {
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
        if (appState.auth.token === null) {
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

    const del = async () => {
        const deleteResponse = await BaseService.delete<ITransportNeed>('Transportneeds/', id, appState.auth.token!);
        if (deleteResponse.ok) {
            goToPreviousPath();
        }
    }

    return (
        <>
            <h4 className="text-danger">Delete This Transportneed</h4>
            <TransportNeedDetailView transportNeed={transportNeed} parcels={parcels} />
            <div>
                <input
                    type="submit"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={del}/>
                    |
                <Link to="#" onClick={() => goToPreviousPath()}>Back to list</Link>
            </div>
        </>
    );
}

export default TransportNeedDelete;