import { i18nTranslation } from "@/i18n";
import { SupportedLanguages } from "@/i18n/settings";

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('notifications-home.title'),
        description: t('notifications-home.description'),
    };
}
const NotificationsHome = () => {
    return <h2>Notifications home</h2>;
};

export default NotificationsHome;
