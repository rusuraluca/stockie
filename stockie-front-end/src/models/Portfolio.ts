import {User} from "./User";
import {Stock} from "./Stock";

export interface Portfolio {
    id: number;
    name: string;
    industry: string;
    public: boolean;
    active: boolean;
    user_id?: number;
    user?: User;
    stocks?: Stock[];
}
