import { ILocation } from "./ILocation";

export interface ITransportMeta {
    id: string;
    startLocation: ILocation | null;
    destinationLocation: ILocation | null;
    startTime: string;

}

export interface ITransportMetaAdd {
    startLocationId: string | null;
    destinationLocationId: string | null;
    startTime: string | undefined;

}