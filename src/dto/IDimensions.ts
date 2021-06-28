export interface IDimensions {
    id: string;
    width: number;
    height: number;
    length: number;
    unitId: string | null;
    unitCode: string;
    whl: string;
}

export interface IDimensionsAdd {
    width: number;
    height: number;
    length: number;
    unitId: string | null;
}