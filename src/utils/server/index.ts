import { cookies } from 'next/headers';
import { TOAST_COOKIE_NAME } from '../constants';
import { SnackbarSeverity } from '@/services/browser/snackbar.service';
import { NextResponse } from 'next/server';

export function addServerToastsCookie(
    message: string,
    severity: SnackbarSeverity,
    response?: NextResponse
) {
    let updatedToasts: { message: string; severity: SnackbarSeverity }[] = [];

    if (response) {
        let existingToasts = response.cookies.get(TOAST_COOKIE_NAME)?.value;
        if (existingToasts) {
            updatedToasts = JSON.parse(existingToasts) as {
                message: string;
                severity: SnackbarSeverity;
            }[];
        }
        updatedToasts.push({ message, severity });
        response.cookies.set(TOAST_COOKIE_NAME, JSON.stringify(updatedToasts));
        return response;
    }

    let existingToasts = cookies().get(TOAST_COOKIE_NAME)?.value;
    if (existingToasts) {
        updatedToasts = JSON.parse(existingToasts) as {
            message: string;
            severity: SnackbarSeverity;
        }[];
    }
    updatedToasts.push({ message, severity });
    cookies().set(TOAST_COOKIE_NAME, JSON.stringify(updatedToasts));
}
