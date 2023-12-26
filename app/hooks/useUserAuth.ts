import { useEffect, useRef, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { ModalContentMapping } from '../utils/bottom-modal';
import { BottomModalService } from '@/app/services/bottom-modal.service';

const bottomModalService = BottomModalService.getInstance();
const authService = AuthService.getInstance();

const useUserAuth = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        authService.state.isAuthenticated
    );
    const [isUserAuthReminded, setIsUserAuthReminded] = useState(
        authService.state.isUserNotifiedToSignin
    );
    const intervalId = useRef<NodeJS.Timeout | undefined>();
    const [bottomModalContent, setBottomModalContent] = useState(
        bottomModalService.state.currentBottomModalContent
    );

    useEffect(() => {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(() => {
            const refreshToken = AuthService.getRefreshToken();
            if (refreshToken) {
                const isExpired = isTokenExpired(refreshToken);
                if (isExpired) {
                    // console.log('currentContent: ', modalContent);
                    if (
                        !(
                            [
                                ModalContentMapping.SIGN_IN,
                                ModalContentMapping.SIGN_UP,
                            ] as (ModalContentMapping | null)[]
                        ).includes(bottomModalContent) &&
                        !isUserAuthReminded
                    ) {
                        bottomModalService.state = {
                            isBottomModalOpen: true,
                            currentBottomModalContent:
                                ModalContentMapping.SIGN_IN,
                        };
                    }
                }
                setIsUserAuthenticated(!isExpired);
            }
        }, 5000);

        return () => {
            clearInterval(intervalId.current);
        };
    }, [bottomModalContent]);

    // set state notifiers
    useEffect(() => {
        bottomModalService.addNotifier((options) => {
            options &&
                setBottomModalContent(options.state.currentBottomModalContent);
        });
        authService.addNotifier((options) => {
            options && [
                setIsUserAuthReminded(options.state.isUserNotifiedToSignin),
                setIsUserAuthenticated(options.state.isAuthenticated),
            ];
        });
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
