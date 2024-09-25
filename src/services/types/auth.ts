export type Role = 'admin' | 'client';
export interface JwtPayload {
    email: string;
    fullName: string;
    avatarUrl: string;
    sub: string;
    role: Role;
}

export interface JwtResponse {
    success: boolean;
    payload?: JwtPayload;
    message?: string;
}

export interface Client {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatarPath: string | null;
}

export interface Admin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
}

export interface UserWithTokens {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export type User = Client | Admin;
