import DropListArrowIcon from '@/app/icons/drop-list-arrow/DropListArrowIcon';
import React from 'react';
import propTypes from 'prop-types';
import '@/app/components/modal-content/menu-drawer-content/MenuDrawerContent.css';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import Link from 'next/link';

interface MenuDrawerContentProps {
    lng: SupportedLanguages;
    menuItems: any[];
}

const MenuDrawerContent = (props: MenuDrawerContentProps) => {
    const { menuItems, lng } = props;
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
                        {menuItem.hasChilds ? (
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

export default MenuDrawerContent;
