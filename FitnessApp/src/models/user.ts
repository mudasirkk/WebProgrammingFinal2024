import { reactive } from "vue";

interface User {
    fname: string;
    lname: string;
    email: string;
    handle: string;
    isAdmin: boolean;
    profPic?: string;
}

interface userStore {
    users: User[];
    showLogin(): User | undefined;
    addUser(user: User): void;
    userLogin(username: string): void; 
    userLogout(): void;
}