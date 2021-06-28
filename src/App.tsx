import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './asssets/site.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import { AppContextProvider, initialAppState } from './context/AppContext';
import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
import Page404 from './containers/Page404';
import Register from './containers/identity/Register';
import TransportNeedsIndex from './containers/transportneeds/TransportNeedsIndex';
import TransportNeedDetail from './containers/transportneeds/TransportNeedDetail';
import TransportNeedEdit from './containers/transportneeds/TransportNeedEdit';
import TransportNeedDelete from './containers/transportneeds/TransportNeedDelete';
import TransportNeedCreate from './containers/transportneeds/TransportNeedsCreate';
import TransportOffersIndex from './containers/transportoffers/TransportOffersIndex';
import TransportOfferDetail from './containers/transportoffers/TransportOfferDetail';
import TransportOfferCreate from './containers/transportoffers/TransportOfferCreate';
import { IAuth } from './types/IAuth';
import { IAppLang } from './dto/languages/IAppLang';
import TransportIndex from './containers/transports/TransportIndex';
import TransportDetails from './containers/transports/TransportDetails';
import TransportEdit from './containers/transports/TransportEdit';
import TransportCreateOffer from './containers/transports/TransportCreateOffer';
import TransportCreateNeed from './containers/transports/TransportCreateNeed';

function App() {
    const setState = (auth: IAuth, appLang: IAppLang): void => {
        setAppState({...appState, auth, appLang});
    }
    const [appState, setAppState] = useState({...initialAppState, setState});

    return (
        <>
            <AppContextProvider value={appState}>
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        <Switch>
                            <Route exact path="/" component={HomeIndex} />
                            <Route path="/identity/login" component={Login} />
                            <Route path="/identity/register" component={Register} />

                            <Route path="/transportneeds/create" component={TransportNeedCreate} />
                            <Route path="/transportneeds/edit/:id" component={TransportNeedEdit} />
                            <Route path="/transportneeds/delete/:id" component={TransportNeedDelete} />
                            <Route path="/transportneeds/:id" component={TransportNeedDetail} />
                            <Route path="/transportneeds" component={TransportNeedsIndex} />
                            
                            <Route path="/transportoffers/create" component={TransportOfferCreate} />
                            <Route path="/transportoffers/:id" component={TransportOfferDetail} />
                            <Route path="/transportoffers" component={TransportOffersIndex} />

                            <Route path="/transports/create-need/:id" component={TransportCreateNeed} />
                            <Route path="/transports/create-offer/:id" component={TransportCreateOffer} />
                            <Route path="/transports/edit/:id" component={TransportEdit} />
                            <Route path="/transports/:id" component={TransportDetails} />
                            <Route path="/transports" component={TransportIndex} />

                            <Route component={Page404} />
                        </Switch>
                    </main>
                </div>
                <Footer />
            </AppContextProvider>
        </>
    );
}

export default App;
