export interface IVehicle{
    id: string;
    make: string;
    model: string;
    releaseDate: string;
    regNr: string;
    vehicleTypeId: string;
    age: string
}

export interface IVehicleAdd {
    make: string;
    model: string;
    releaseDate: string;
    regNr: string;
    vehicleTypeId: string;
}