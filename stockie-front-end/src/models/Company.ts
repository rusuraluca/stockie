import {Stock} from "./Stock";

export interface Company {
    id?: number;
    name: string;
    size: number;
    country: string;
    industry: string;
    stock?: Stock;
}

export interface CompanyError {
    generic: string,
    name: string;
    country: string;
}

export interface TouchedFields {
    name: boolean;
    size: boolean;
    country: boolean;
    industry: boolean;
}
