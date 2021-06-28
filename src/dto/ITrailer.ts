import { IDimensions } from "./IDimensions";

export interface ITrailer {
    id: string;
    loadCapacity: number;
    regNr: string;
    unitId: string;
    dimensions: IDimensions;

}

export interface ITrailerAdd {
    loadCapacity: number;
    regNr: string;
    unitId: string | null;
    dimensionsId: string | null;

}