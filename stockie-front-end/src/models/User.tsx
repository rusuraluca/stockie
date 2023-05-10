import {Portfolio} from "./Portfolio";
import {Company} from "./Company";
import {Stock} from "./Stock";
import {UserAccount} from "./UserAccount";

export interface User {
    id?: number;
    username: string;
    password: string;
    role?: string;
    user_id?: number;
    user?: User;
    companies?: Company[];
    stocks?: Stock[];
    portfolios?: Portfolio[];
    user_account?: UserAccount;
}
