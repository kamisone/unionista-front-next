import { fetchProductsCategories } from '@/actions';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import DropListArrowIcon from '@/icons/drop-list-arrow/DropListArrowIcon';
import clsx from 'clsx';
import Link from 'next/link';

interface MenuDrawerNavItem {
    id: string;
    hasChildren: boolean;
    translations: {
        name: string;
    };
}

interface MenuDrawerNavContentProps {
    lng: SupportedLanguages;
}

async function MenuDrawerNavContent(props: MenuDrawerNavContentProps) {
    const { lng } = props;

    const menuItems = await fetchProductsCategories(lng);

    return (
        <ul
            className={clsx(
                'grid content-start overflow-y-scroll px-4',
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className
            )}
        >
            {menuItems.map((menuItem) => {
                return (
                    <li
                        key={menuItem.id}
                        className="flex items-center justify-between text-sm capitalize"
                    >
                        {menuItem.hasChildren ? (
                            <Link href={`/${lng}/${menuItem.id}`}>
                                {menuItem.translations.name}
                            </Link>
                        ) : (
                            <p>{menuItem.translations.name}</p>
                        )}
                        <DropListArrowIcon />
                    </li>
                );
            })}
        </ul>
    );
}

export default MenuDrawerNavContent;
