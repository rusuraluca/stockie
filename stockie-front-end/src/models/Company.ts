import {Stock} from "./Stock";
import {User} from "./User";

export interface Company {
    id?: number;
    name: string;
    size: number;
    country: string;
    industry: string;
    stock?: Stock;
    user_id?: number;
    user?: User;
}
