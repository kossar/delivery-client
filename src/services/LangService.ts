import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from "../configuration";
import { ILangResources } from '../dto/languages/ILangResources';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class LangService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl + "Lang/",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async getSupportedLanguages<TEntity>(apiEndPoint: string, langName: string): Promise<IFetchResponse<TEntity[]>> {
        if (langName !== "") {
            apiEndPoint = apiEndPoint + '?culture=' + langName;
        }

        try {
            let response = await this.axios.get<TEntity[]>(apiEndPoint);

            return {
                ok: response.status < 300,
                statusCode: response.status,
                data: response.data,

            }
        } catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }

    static async getLangResources<TEntity>(apiEndPoint: string, langName: string): Promise<IFetchResponse<TEntity>> {
        if (langName !== "") {
            apiEndPoint = apiEndPoint + '?culture=' + langName;
        }

        try {
            let response = await this.axios.get<TEntity>(apiEndPoint);

            return {
                ok: response.status < 300,
                statusCode: response.status,
                data: response.data,

            }
        } catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }
}