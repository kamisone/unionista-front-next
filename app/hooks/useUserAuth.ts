import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { toggleBottomModal } from '../lib/features/header/headerSlice';
import { ModalContentMapping } from '../utils/bottom-modal';
import { useAppDispatch, useAppSelector } from '../lib/store';

const useUserAuth = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [refreshToken] = useState(AuthService.getRefreshToken());
    const headerState = useAppSelector((state) => state.header);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (refreshToken) {
            const isExpired = isTokenExpired(refreshToken);
            if (isExpired) {
                if (
                    !(
                        [
                            ModalContentMapping.SIGN_IN,
                            ModalContentMapping.SIGN_UP,
                        ] as (ModalContentMapping | null)[]
                    ).includes(headerState.currentContent)
                ) {
                    dispatch(
                        toggleBottomModal({
                            isBottomModalOpen: true,
                            currentContent: ModalContentMapping.SIGN_IN,
                        })
                    );
                }

                setIsUserAuthenticated(isExpired);
            }
        }

        const intervalId = setInterval(function () {
            const refreshToken = AuthService.getRefreshToken();
            if (refreshToken) {
                const isExpired = isTokenExpired(refreshToken);
                if (isExpired) {
                    console.log(
                        'current contentHeader: ',
                        headerState.currentContent,
                        headerState.isBottomModalOpen
                    );
                    if (
                        !(
                            [
                                ModalContentMapping.SIGN_IN,
                                ModalContentMapping.SIGN_UP,
                            ] as (ModalContentMapping | null)[]
                        ).includes(headerState.currentContent)
                    ) {
                        console.log('yes expired contentHeader');
                        dispatch(
                            toggleBottomModal({
                                isBottomModalOpen: true,
                                currentContent: ModalContentMapping.SIGN_IN,
                            })
                        );
                    }
                }
                setIsUserAuthenticated(!isExpired);
            }
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function isTokenExpired(token: string) {
        const jwtBody = token.split('.')[1];
        if (!jwtBody) return true;
        const expiry = JSON.parse(atob(jwtBody)).exp as number;
        return Math.floor(Date.now() / 1000) >= expiry;
    }

    return isUserAuthenticated;
};

export { useUserAuth };
