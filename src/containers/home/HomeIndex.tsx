import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import TransportNeedList from "../../components/TransportNeedList";
import { ITransportNeed } from "../../dto/ITransportNeed";
import { BaseService } from "../../services/BaseService";
import { useHistory } from "react-router-dom";

const HomeIndex = () => {
    const appState = useContext(AppContext);

    const history = useHistory();
    const [transportNeeds, setTransportNeeds] = useState([] as ITransportNeed[]);

    const loadData = async () => {
        let result = await BaseService.getAll<ITransportNeed>('TransportNeeds');
        console.log(result);

        if (result.ok && result.data) {
            setTransportNeeds(result.data);
        }
    }

    useEffect(() => {
        loadData();
    }, []);
    
    console.log(appState);

    return (

        <div className="home">
            <h1 className="text-center">{appState.appLang.langResources.views.home.welcomeHeading}</h1>
            <div className="row d-flex justify-content-around m-5">
                <div>
                    <input
                        disabled={appState.auth.token === null}
                        type="button"
                        value="Ask transport"
                        className="btn btn-info p-4"
                        onClick={() => history.push("/transportneeds/create")} />
                </div>
                <div>
                    <input
                        disabled={appState.auth.token === null}
                        type="button"
                        value="Offer transport"
                        className="btn btn-info p-4"
                        onClick={() => history.push("/transportoffers/create")} />
                </div>
            </div>

            <TransportNeedList transportNeeds={transportNeeds}/>

        </div>

    );
}

export default HomeIndex;