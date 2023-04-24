import {Portfolio} from "./Portfolio";

export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address?: string;
    birthday?: string;
    portfolios?: Portfolio[];
}

export interface UserError {
    generic: string,
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface TouchedFields {
    first_name: boolean;
    last_name: boolean;
    email: boolean;
    password: boolean;
}
