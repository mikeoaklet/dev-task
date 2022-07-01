import { User } from './user.interface';

export interface ListUsersResponseInterface {
    page: number;
    perPage: number;
    total: number;
    data: User[];
}
