import { ETransportStatus } from "../dto/enums/ETransportStatus";
import { IDimensions, IDimensionsAdd } from "../dto/IDimensions";
import { ILocation, ILocationAdd } from "../dto/ILocation";
import { IParcel } from "../dto/IParcel";
import { ITransport, ITransportAdd } from "../dto/ITransport";
import { ITransportMeta, ITransportMetaAdd } from "../dto/ITransportMeta";
import { ITransportNeed, ITransportNeedAdd } from "../dto/ITransportNeed";
import { ITransportOffer, ITransportOfferAdd } from "../dto/ITransportOffer";
import { IUnit } from "../dto/IUnit";
import { IVehicle, IVehicleAdd } from "../dto/IVehicle";

export class CreateInitialObjects {
    static initLocation(): ILocation {
        return {
            id: "",
            country: "",
            city: "",
            address: "",
            locationInfo: undefined
        }
    }

    static initLocationAdd(): ILocationAdd {
        return {
            country: "",
            city: "",
            address: "",
            locationInfo: undefined
        }
    }

    static initDimensions(): IDimensions {
        return {
            id: "",
            width: 0,
            height: 0,
            length: 0,
            unitId: null,
            unitCode: "",
            whl: ""
        }
    }

    static initDimensionsAdd(): IDimensionsAdd {
        return {
            width: 0,
            height: 0,
            length: 0,
            unitId: null
        }
    }

    static initTransportMetaAdd(): ITransportMetaAdd {
        return {
            startLocationId: null,
            destinationLocationId: null,
            startTime: undefined
        }
    }

    static initTransportMeta(): ITransportMeta {
        return {
            id: "",
            startLocation: this.initLocation(),
            destinationLocation: this.initLocation(),
            startTime: "",
        }
    }

    static initParcel(): IParcel {
        return {
            id: "",
            weight: 0,
            parcelInfo: null,
            unitId: "",
            unitCode: "",
            dimensions: this.initDimensions(),
            transportNeedId: ""
        }
    }

    static initTransportNeedAdd(): ITransportNeedAdd {
        return {
            transportNeedInfo: "",
            transportType: undefined,
            personCount: 0,
            transportMetaId: "",
        }
    }

    static initTransportNeed(): ITransportNeed {
        return {
            id: "",
            transportNeedInfo: "",
            transportType: 1,
            personCount: 0,
            transportMeta: this.initTransportMeta(),
            appUserId: "",
            parcelIds: []
        }
    }

    static initUnit(): IUnit {
        return {
            id: "",
            unitCode: "",
            unitName: ""
        }
    }

    static initVehicle(): IVehicle {
        return {
            id: "",
            make: "",
            model: "",
            releaseDate: "",
            regNr: "",
            vehicleTypeId: "",
            age: ""
        }
    }
    static initVehicleAdd(): IVehicleAdd {
        return {
            make: "",
            model: "",
            releaseDate: "",
            regNr: "",
            vehicleTypeId: ""
        }
    }

    static initTransport(): ITransport {
        return {
            id: "",
            transportStatus: undefined,
            finalPrice: 0,
            pickUpTime: "",
            estimatedDeliveryTime: "",
            deliveredTime: "",
            pickUpLocation: this.initLocation(),
            transportNeedId: "",
            transportOfferId: ""
        }
    }

    static initTransportAdd(): ITransportAdd {
        return {
            transportStatus: 1,
            finalPrice: 0,
            pickUpTime: "",
            estimatedDeliveryTime: undefined,
            deliveredTime: undefined,
            pickUpLocationId: "",
            transportNeedId: "",
            transportOfferId: ""
        }
    }
    static initTransportOfferAdd(): ITransportOfferAdd {
        return {
            transportOfferInfo: "",
            transportType: undefined,
            price: 0,
            availableLoadCapacity: 0,
            freeSeats: 0,
            transportMetaId: undefined,
            vehicleId: undefined,
            trailerId: undefined,
            unitId: undefined
        }
    }

    static initTransportOffer(): ITransportOffer {
        return {
            id: "",
            transportOfferInfo: "",
            transportType: 1,
            price: 0,
            availableLoadCapacity: 0,
            freeSeats: 0,
            transportMeta: this.initTransportMeta(),
            appUserId: "",
            vehicle: this.initVehicle(),
            trailer: null,
            unit: this.initUnit()
        }
    }
}