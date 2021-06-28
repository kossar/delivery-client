import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { ApiBaseUrl } from '../configuration';
import { AppContext, IAppState } from '../context/AppContext';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class BaseService {

    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(jwt?: string): AxiosRequestConfig | undefined{
        if(!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };

        return config;
    }

    static async delete<TEntity>(apiEndPoint: string, id: string, jwt: string): Promise<IFetchResponse<TEntity>> {
        let url = apiEndPoint;
        url = url + id;
        try {
            const response = await this.axios.delete(url, BaseService.getAxiosConfiguration(jwt));
            if (response.status >= 200 && response.status < 300) {
                return {
                    ok: response.status < 300,
                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                ok: false,
                statusCode: response.status,
                messages: [response.statusText]
            };
        } catch (error) {
            return {
                ok: false,
                statusCode: 0,
                messages: (error.response?.data as IMessages).messages
            };
        }
    }

    static async put<TEntity>(apiEndPoint: string, id: string, entity: any, jwt: string): Promise<IFetchResponse<TEntity>> {
        try {
            const response = await this.axios.put(apiEndPoint + id, JSON.stringify(entity), BaseService.getAxiosConfiguration(jwt));
            console.log("response in put:");

            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                console.log("put response ok");
                return {
                    ok: response.status < 300,
                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                ok: false,
                statusCode: response.status,
                messages: [response.statusText]
            };
        } catch (error) {
            console.log('some error in put');
            return {
                ok: false,
                statusCode: 0,
                messages: (error.response?.data as IMessages).messages
            };
        }
    }


    static async post<TEntity>(entity: any, apiEndPoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            
            const response = await this.axios.post(apiEndPoint, JSON.stringify(entity), BaseService.getAxiosConfiguration(jwt));
            if (response.status >= 200 && response.status < 300) {
                return {
                    ok: response.status < 300,
                    statusCode: response.status,
                    data: response.data,
                };
            }

            return {
                ok: false,
                statusCode: response.status,
                messages: [response.statusText]
            };
        } catch (error) {
            return {
                ok: false,
                statusCode: 0,
                messages: (error.response?.data as IMessages).messages
            };
        }
    }

    static async getAll<TEntity>(apiEndPoint: string, jwt?: string): Promise<IFetchResponse<TEntity[]>> {
        console.log(jwt);
        try {
            let response = await this.axios.get<TEntity[]>(apiEndPoint, BaseService.getAxiosConfiguration(jwt));

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

    static async get<TEntity>(apiEndPoint: string, id: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.get<TEntity>(apiEndPoint + id, BaseService.getAxiosConfiguration(jwt));

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