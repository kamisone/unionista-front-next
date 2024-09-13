import { SupportedLanguages } from '@/i18n/settings';

interface DesktopHeaderProps {
    lng: SupportedLanguages;
}

const DesktopFooter = ({ lng }: DesktopHeaderProps) => {
    return (
        <div>
            <h2>Desktop footer</h2>
        </div>
    );
};

export default DesktopFooter;
