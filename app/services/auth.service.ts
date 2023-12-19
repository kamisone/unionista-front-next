// import { FormValues } from '@/app/components/modal-content/login-in-content/LoginContent';
import { isBrowser } from '../utils/is-browser';
import { HttpService } from './http.service';
import { SnackbarService, SnackbarSeverity } from './snackbar.service';
import { AxiosError } from 'axios';
import React from 'react';

const httpService = HttpService.getInstance();
const snackbarService = SnackbarService.getInstance();

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class AuthService {
    static myInstance: AuthService;

    static getInstance() {
        if (!AuthService.myInstance) {
            AuthService.myInstance = new AuthService();
        }
        return this.myInstance;
    }

    static isUserAuthenticated() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;

        // return verify(refreshToken);
    }

    static get endpoints() {
        return {
            REFRESH_TOKEN: 'auth/refresh',
            SIGN_IN: 'auth/signin',
            SIGN_UP: 'auth/signup',

            // local storage
            ACCESS_TOKEN_ID: 'access-token-id',
            REFRESH_TOKEN_ID: 'refresh-token-id',
        };
    }

    static get routerSegments() {
        return {
            SIGN_IN: '?modal_content=signin',
        };
    }

    async signinUser(data: Record<string, unknown>) {
        try {
            const response = await httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_IN,
                body: data,
            });

            return response.data;
        } catch (error: any) {
            if (error.response.status >= 500) {
                return snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
            throw new Error(error.response.data?.message);
        }
    }
    async signupUser(data: Record<string, unknown>) {
        try {
            const response = await httpService.post<UserWithTokens>({
                path: AuthService.endpoints.SIGN_UP,
                body: data,
            });
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status >= 500) {
                    return snackbarService.openSnackbar({
                        message: `Error: ${
                            error.response.data?.message ?? error.message
                        }`,
                        severity: SnackbarSeverity.ERROR,
                    });
                }
                throw new Error(error.response.data.message);
            } else {
                throw error;
            }
        }
    }

    static async refreshToken() {
        try {
            const response = await httpService.get<AuthTokens>({
                path: AuthService.endpoints.REFRESH_TOKEN,
            });
            return response.data;
        } catch (error: unknown) {
            console.log('refresh error occurred');
            if (error instanceof AxiosError && error.response) {
                snackbarService.openSnackbar({
                    message: `Error: ${
                        error.response.data?.message ?? error.message
                    }`,
                    severity: SnackbarSeverity.ERROR,
                });
            }
        }
    }

    static updateAccessToken(accessToken: string) {
        isBrowser() &&
            localStorage.setItem(
                AuthService.endpoints.ACCESS_TOKEN_ID,
                accessToken
            );
    }
    static updateRefreshToken(refreshToken: string) {
        isBrowser() &&
            localStorage.setItem(
                AuthService.endpoints.REFRESH_TOKEN_ID,
                refreshToken
            );
    }

    static getAccessToken() {
        return isBrowser()
            ? localStorage.getItem(AuthService.endpoints.ACCESS_TOKEN_ID)
            : null;
    }
    static getRefreshToken() {
        return isBrowser()
            ? localStorage.getItem(AuthService.endpoints.REFRESH_TOKEN_ID)
            : null;
    }
}

export interface UserWithTokens {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;

    fullName: string;

    emailAddress: string;

    phoneNumber: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
