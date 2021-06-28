import { ETransportType } from "./enums/ETransportType";
import { ITransportMeta } from "./ITransportMeta";

export interface ITransportNeed {
    id: string;
    transportNeedInfo: string;
    transportType: ETransportType | undefined;
    personCount: number;
    transportMeta: ITransportMeta;
    parcelIds: string[];
    appUserId: string;
  }

export interface ITransportNeedAdd {
  transportNeedInfo: string;
  transportType: ETransportType | undefined;
  personCount: number;
  transportMetaId: string;
}