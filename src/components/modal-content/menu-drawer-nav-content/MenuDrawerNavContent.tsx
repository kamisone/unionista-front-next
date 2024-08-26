import { fetchProductsCategories } from '@/actions';
import '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent.css';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import DropListArrowIcon from '@/icons/drop-list-arrow/DropListArrowIcon';
import {
    ProductCategoryService
} from '@/services/product-category.service';
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

const MenuDrawerNavContent = async (props: MenuDrawerNavContentProps) => {
    const { lng } = props;


    const menuItems = (await new Promise(function (res) {
        setTimeout(() => {
            res(fetchProductsCategories(lng));
        }, 2000);
    })) as MenuDrawerNavItem[];

    return (
        <ul
            className={clsx(
                'mdc_container',
                lng,
                lng === SupportedLanguagesEnum.AR
                    ? UthmanicFont.className
                    : Graphik.className
            )}
        >
            {menuItems.map((menuItem) => {
                return (
                    <li key={menuItem.id}>
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
};

export default MenuDrawerNavContent;
