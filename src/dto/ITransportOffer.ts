import { ETransportType } from "./enums/ETransportType";
import { ITrailer } from "./ITrailer";
import { ITransportMeta } from "./ITransportMeta";
import { IUnit } from "./IUnit";
import { IVehicle } from "./IVehicle";

export interface ITransportOffer{
    id: string;
    transportOfferInfo: string | undefined;
    transportType: ETransportType;
    price: number;
    availableLoadCapacity: number;
    freeSeats: number;
    transportMeta: ITransportMeta;
    appUserId: string;
    vehicle: IVehicle | null;
    trailer: ITrailer | null;
    unit: IUnit;
}

export interface ITransportOfferAdd {
    transportOfferInfo: string | undefined;
    transportType: ETransportType | undefined;
    price: number;
    availableLoadCapacity: number;
    freeSeats: number;
    transportMetaId: string | undefined;
    vehicleId: string | undefined;
    trailerId: string | undefined;
    unitId: string | undefined;
}