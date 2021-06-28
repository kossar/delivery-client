import React from "react";
import { IAppLang } from "../dto/languages/IAppLang";
import { IAuth } from "../types/IAuth";

export interface IAppState {
    auth: IAuth;

    appLang: IAppLang;

    setState: (auth: IAuth, appLang: IAppLang) => void;
    // setState: (
    //     jwt: string | null,
    //     firstName: string,
    //     lastName: string,
    //     supportedLanguages: ISupportedLanguage[],
    //     currentLanguage: ISupportedLanguage,
    //     langResources: ILangResources) => void;


}


export const initialAppState: IAppState = {
    auth: {
        token: null,
        firstname: '',
        lastname: '',
    },

    appLang: {
        currentLanguage: { name: 'en-GB', nativeName: 'English' },

        supportedLanguages: [],

        langResources: {
            views: {
                shared: {
                    layOut: {
                        languages: "Select language",
                        transportNeeds: "Transport needs",
                        transportOffers: "Transport offers"
                    }
                },
                home: {
                    welcomeHeading: "Welcome"
                },
                logIn: {
                    login: "Log In",
                    logOut: "Log Out",
                    register: "Register"
                }
            }
        }
    },
    setState: (): void => { },

}

export const AppContext = React.createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;