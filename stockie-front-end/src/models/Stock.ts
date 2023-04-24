import {Company} from "./Company";

export interface Stock {
    id?: number;
    ticker: string;
    current_price: number;
    min_price: number;
    max_price: number;
    company_id?: number;
    company?: Company;
}
