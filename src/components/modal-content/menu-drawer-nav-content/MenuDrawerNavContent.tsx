import { fetchParentsProductsCategories } from '@/actions';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import clsx from 'clsx';
import ProductCategoryChildren from '@/components/modal-content/menu-drawer-nav-content/product-category-children/ProductCategoryChildren';

interface MenuDrawerNavContentProps {
    lng: SupportedLanguages;
    isMobile?: boolean;
}

async function MenuDrawerNavContent(props: MenuDrawerNavContentProps) {
    const { lng, isMobile } = props;

    const menuItems = await fetchParentsProductsCategories(lng);

    return (
        <nav>
            <ul
                className={clsx(
                    'grid content-start px-4',
                    lng === SupportedLanguagesEnum.AR
                        ? UthmanicFont.className
                        : Graphik.className
                )}
            >
                {menuItems.map((menuItem) => {
                    return (
                        <li
                            key={menuItem.id}
                            className="grid grid-cols-[1fr_auto]  justify-between items-center text-sm capitalize"
                        >
                            <LinkTransparentButton
                                to={`/${lng}/${menuItem.slug}`}
                            >
                                <span>{menuItem.translations.name}</span>
                            </LinkTransparentButton>

                            <ProductCategoryChildren
                                lng={lng}
                                parentId={menuItem.id}
                                isMobile={isMobile}
                            />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default MenuDrawerNavContent;
