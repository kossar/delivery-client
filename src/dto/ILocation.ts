export interface ILocation {
    id: string;
    country: string;
    city: string;
    address: string;
    locationInfo: string | undefined;

}

export interface ILocationAdd{
    country: string;
    city: string;
    address: string;
    locationInfo: string | undefined;

}