import HomeIcon from '@/icons/home/HomeIcon';
import ItemsIcon from '@/icons/items/ItemsIcon';
import SearchIcon from '@/icons/search-icon/SearchIcon';
import SettingsIcon from '@/icons/settings/SettingsIcon';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';

export default function SidePanel() {
    const routes = [
        { label: 'search', Icon: SearchIcon },
        { label: 'dashboard', Icon: HomeIcon },
        { label: 'listings', Icon: ItemsIcon },
        { label: 'settings', Icon: SettingsIcon },
    ];
    return (
        <section
            role="navigation"
            className="bg-white px-4 border-0 border-r border-solid border-light-sage"
        >
            <div className="flex items-center gap-4">
                <HomeIcon />
                <h2 className="text-lg font-semibold">Shop Manager</h2>
            </div>
            <div className="grid content-start gap-4">
                {routes.map((route) => (
                    <LinkTransparentButton
                        key={route.label}
                        to={'/admin/' + route.label}
                        utilityClasses="flex items-center gap-2"
                        active="bg-primary"
                    >
                        <div className="text-secondary">
                            <route.Icon />
                        </div>
                        <span className="first-letter:uppercase">
                            {route.label}
                        </span>
                    </LinkTransparentButton>
                ))}
            </div>
        </section>
    );
}
