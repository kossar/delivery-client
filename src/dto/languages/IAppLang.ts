import { ILangResources } from "./ILangResources";
import { ISupportedLanguage } from "./ISupportedLanguage";

export interface IAppLang{
    supportedLanguages: ISupportedLanguage[];

    currentLanguage: ISupportedLanguage;

    langResources: ILangResources;
}