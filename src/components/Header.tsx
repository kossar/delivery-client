import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ILangResources } from "../dto/languages/ILangResources";
import { ISupportedLanguage } from "../dto/languages/ISupportedLanguage";
import { LangService } from "../services/LangService";
import { IAuth } from "../types/IAuth";

const LoginRegister = () => {
    const appState = useContext(AppContext);
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/identity/register">{appState.appLang.langResources.views.logIn.register}</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/identity/login">{appState.appLang.langResources.views.logIn.login}</NavLink>
            </li>
        </ul>
    );
}

const LogOut = () => {
    const appState = useContext(AppContext);

    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link text-dark" onClick={() => { appState.setState({token: null, firstname: '', lastname: ''}, {...appState.appLang}) }} to="/">{appState.appLang.langResources.views.logIn.logOut}</NavLink>
            </li>
        </ul>
    )
};

const Identity = (props: { isLoggedIn: boolean; }) => {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <LogOut />;
    }
    return <LoginRegister />;
}

const Header = () => {
    const appState = useContext(AppContext);

    const changeLanguage = async (lang: ISupportedLanguage, e: React.MouseEvent<HTMLAnchorElement>) => {
       
    
        let resp = await LangService.getLangResources<ILangResources>("GetLangResources", lang.name);
        if(resp.ok && resp.data){
            appState.appLang.langResources = resp.data as ILangResources;
            appState.setState({...appState.auth}, {...appState.appLang, langResources: resp.data, currentLanguage: lang})
        }
        console.log("current");
        console.log(appState.appLang.currentLanguage);
      }
    

    const loadData = async () => {
        let result = await LangService.getSupportedLanguages<ISupportedLanguage>("GetSupportedLanguages", appState.appLang.currentLanguage.name);
        console.log(result);

        if (result.ok && result.data) {
            let lng = appState.appLang;
            lng.supportedLanguages = result.data;
            appState.setState({...appState.auth}, lng);
        }

        let resp = await LangService.getLangResources<ILangResources>("GetLangResources", appState.appLang.currentLanguage.name);
        if(resp.ok && resp.data){
            appState.appLang.langResources = resp.data as ILangResources;
            appState.setState({...appState.auth}, {...appState.appLang, langResources: resp.data})
        }

        console.log("lang");
        console.log(resp.data);
    }

    useEffect(() => {
        loadData();
    }, []);


    return (<header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container">
                <NavLink className="navbar-brand" to="/">De Li Ve Ry</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">

                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/TransportNeeds">{appState.appLang.langResources.views.shared.layOut.transportNeeds}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/TransportOffers">{appState.appLang.langResources.views.shared.layOut.transportOffers}</NavLink>
                        </li>

                        {appState.auth.token !== null ?
                            (<>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ADD
                            </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="nav-link text-dark" to="/transportoffers/create">Offer</NavLink>
                                    <NavLink className="nav-link text-dark" to="/transportneeds/create" >Request</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/transports">Transports</NavLink>
                            </li>
                        </>) : null
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {appState.appLang.langResources.views.shared.layOut.languages}
    </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {appState.appLang.supportedLanguages.map(l => (<a className="dropdown-item text-dark" onClick={(e) => changeLanguage(l, e)} key={l.name}>{l.nativeName}</a>))}
                            
                            </div>
                        </li>
                    </ul>
                    {appState.auth.token !== null ?
                    (<ul className="navbar-nav">
                        <li className="nav-item">Hello <span className="text-info font-weight-bold">{appState.auth.firstname}</span> |</li>
                    </ul>) : null}
                    <Identity isLoggedIn={appState.auth.token != null} />
                </div>
            </div>
        </nav>
    </header>);
}

export default Header;