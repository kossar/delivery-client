import { ETransportStatus } from "./enums/ETransportStatus";
import { ILocation } from "./ILocation";

export interface ITransport {
    id: string;
    transportStatus: ETransportStatus | undefined;
    finalPrice: number;
    pickUpTime: string;
    estimatedDeliveryTime: string | undefined;
    deliveredTime: string | undefined;
    pickUpLocation: ILocation;
    transportNeedId: string;
    transportOfferId: string;
}

export interface ITransportAdd {
    transportStatus: ETransportStatus | undefined;
    finalPrice: number;
    pickUpTime: string;
    estimatedDeliveryTime: string | undefined;
    deliveredTime: string | undefined;
    pickUpLocationId: string;
    transportNeedId: string;
    transportOfferId: string;
}