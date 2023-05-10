import {User} from "./User";

export interface Portfolio {
    id?: number;
    name: string;
    industry: string;
    public: boolean;
    active: boolean;
    stocks?: number[];
    user_id?: number;
    user?: User;
}
