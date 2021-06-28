import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import TransportNeedList from "../../components/TransportNeedList";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { BaseService } from "../../services/BaseService";

const TransportNeedsIndex = () => {
    const appState = useContext(AppContext);

    const [transportNeeds, setTransportNeeds] = useState([] as ITransportNeed[]);

    const loadData = async () => {
        let result = await BaseService.getAll<ITransportNeed>('TransportNeeds');
        console.log(result);

        if (result.ok && result.data) {
            setTransportNeeds(result.data)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log(appState);

    return (

        <>
            <h1 className="text-center mt-5 mb-5">Transport needs</h1>

            <TransportNeedList transportNeeds={transportNeeds} />
        </>

    );
}

export default TransportNeedsIndex;