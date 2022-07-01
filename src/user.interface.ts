export type ImageUrlString = string;

export interface User {
    id: number;
    avatar: ImageUrlString;
    first_name: string;
    last_name: string;
    email: string;
}
