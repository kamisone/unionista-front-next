import DropListArrowIcon from '@/icons/drop-list-arrow/DropListArrowIcon';
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent.css';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/fonts/fonts';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import Link from 'next/link';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/services/product-category.service';
import { ModalContentMapping } from '@/utils/modal';

const productCategoryService = ProductCategoryService.getInstance();

interface MenuDrawerNavItem {
    id: string;
    hasChildren: boolean;
    translations: {
        name: string;
    };
}

interface MenuDrawerNavContentProps {
    lng: SupportedLanguages;
    menuItems: MenuDrawerNavItem[];
}

const MenuDrawerNavContent = (props: MenuDrawerNavContentProps) => {
    const { lng, menuItems } = props;

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
