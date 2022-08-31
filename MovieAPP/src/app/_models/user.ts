export interface User {
    username: string;
    token: string;
    roles: string[];

}
export class UpdateUser {
    id: number = 0;
    username: string = "";
    newUsername: string = "";
    email: string = "";
    currentPassword: string = "";
    newPassword: string = "";
}
export interface GetUser {
    id: number;
    userName: string;
    email: string;
    photos: Photo
}
export interface Photo {
    userId: number;
    url: string;
}