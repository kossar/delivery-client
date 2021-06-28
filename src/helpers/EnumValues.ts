import { ETransportStatus } from "../dto/enums/ETransportStatus";
import { ETransportType } from "../dto/enums/ETransportType";

export class EnumValues {

    static getTransportTypeValues(): number[] {
        var enumValues: number[] = [];
        for (var val in ETransportType) {
            if (!isNaN(Number(val))) {
                enumValues.push(parseInt(val));
            }
        }
        return enumValues;

    }

    static getEStatusType(statusType: number): string {
        return ETransportStatus[statusType];
    }
    static getEType(transportType: number): string {
        return ETransportType[transportType];
    }
}