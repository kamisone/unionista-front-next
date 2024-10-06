export type Role = 'admin' | 'client';
export interface JwtPayload {
    email: string;
    fullName: string;
    avatarUrl: string;
    sub: string;
    role: Role;
}

export interface JwtVerifyResponseType {
    success: boolean;
    payload?: JwtPayload;
    message?: string;
}

export interface JwtRefreshResponseType {
    success: boolean;
    accessToken?: string;
    message?: string;
}

export interface JwtAuthResponseType {
    success: boolean;
    userPayload?: JwtPayload;
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
    userPayload: JwtPayload;
    accessToken: string;
    refreshToken: string;
}

export type User = Client | Admin;
