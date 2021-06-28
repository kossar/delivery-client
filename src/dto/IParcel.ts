import { IDimensions } from "./IDimensions";

export interface IParcel {
    id: string;
    weight: number,
    parcelInfo: string | null;
    unitId: string;
    unitCode: string;
    dimensions: IDimensions;
    transportNeedId: string;
}

export interface IParcelAdd {
    weight: number,
    parcelInfo: string | null;
    unitId: string;
    dimensionsId: string;
    transportNeedId: string;
}