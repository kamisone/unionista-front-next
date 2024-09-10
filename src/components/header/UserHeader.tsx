import DesktopHeader from '@/components/header/desktop/DesktopHeader';
import MobileHeader from '@/components/header/mobile/MobileHeader';
import { SupportedLanguages } from '@/i18n/settings';


interface UserHeaderProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
    user: any;
}

function UserHeader({
    lng,
    isMobile = false,
    user,
}: UserHeaderProps) {
    // const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    //     authService.state.isUserAuthenticated
    // );

    // useEffect(() => {
    //     // add notifiers
    //     authService.addNotifier(
    //         (options) =>
    //             options &&
    //             setIsUserAuthenticated(options.state.isUserAuthenticated)
    //     );
    // }, []);

    // useUpdatePathQuery();

    // useEffect(() => {
    //     // set auth intialstate
    //     const accessToken = AuthService.getAccessToken();
    //     const refreshToken = AuthService.getRefreshToken();

    //     authService.state = {
    //         isUserAuthenticated: accessToken
    //             ? !AuthService.isTokenInvalid(accessToken)
    //             : false,
    //         isUserNotifiedToSignin: AuthService.getIsUserNotifiedToSignin(),
    //     };
    //     if (
    //         !authService.state.isUserAuthenticated &&
    //         refreshToken &&
    //         !AuthService.isTokenInvalid(refreshToken)
    //     ) {
    //         AuthService.refreshToken();
    //     }
    // }, []);
    // const isUserAuthenticated = authService.state.isUserAuthenticated;

    return isMobile ? (
        <MobileHeader user={user} lng={lng} />
    ) : (
        <DesktopHeader user={user} lng={lng} />
    );
}

export default UserHeader;
