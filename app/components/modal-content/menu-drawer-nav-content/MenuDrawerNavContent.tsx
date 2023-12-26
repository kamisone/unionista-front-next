import DropListArrowIcon from '@/app/icons/drop-list-arrow/DropListArrowIcon';
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import '@/app/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent.css';
import clsx from 'clsx';
import { Graphik, UthmanicFont } from '@/app/fonts/fonts';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import Link from 'next/link';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/app/services/product-category.service';
import { ModalContentMapping } from '@/app/utils/bottom-modal';

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
