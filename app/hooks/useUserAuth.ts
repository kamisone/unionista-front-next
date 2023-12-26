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
                const isExpired = AuthService.isTokenExpired(refreshToken);
                if (isExpired) {
                    if (
                        !(
                            [
                                ModalContentMapping.SIGN_IN,
                                ModalContentMapping.SIGN_UP,
                            ] as (ModalContentMapping | null)[]
                        ).includes(bottomModalContent) &&
                        !isUserAuthReminded
                    ) {
                        AuthService.setIsUserNotifiedToSignIn();
                        authService.state = {
                            isAuthenticated: false,
                            isUserNotifiedToSignin: true,
                        };
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
    }, [bottomModalContent, isUserAuthReminded, isUserAuthenticated]);

    // set state notifiers
    useEffect(() => {
        bottomModalService.addNotifier((options) => {
            options &&
                setBottomModalContent(options.state.currentBottomModalContent);
        });
        authService.addNotifier((options) => {
            if (options) {
                setIsUserAuthReminded(options.state.isUserNotifiedToSignin);
                setIsUserAuthenticated(options.state.isAuthenticated);
            }
        });
    }, []);

    // set auth intialstate
    useEffect(() => {
        console.log(
            'is User notified: ',
            AuthService.getIsUserNotifiedToSignin() || false
        );
        const refreshToken = AuthService.getRefreshToken();
        authService.state = {
            isAuthenticated: refreshToken
                ? !AuthService.isTokenExpired(refreshToken)
                : false,
            isUserNotifiedToSignin:
                AuthService.getIsUserNotifiedToSignin() || false,
        };
    }, []);

    return isUserAuthenticated;
};

export { useUserAuth };
