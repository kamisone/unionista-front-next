import DropListArrowIcon from '@/app/icons/drop-list-arrow/DropListArrowIcon';
import React from 'react';
import propTypes from 'prop-types';
import '@/app/components/modal-content/menu-drawer-content/MenuDrawerContent.css';
import clsx from 'clsx';
import { Graphik } from '@/app/fonts/fonts';

interface MenuDrawerContentProps {
    menuItems: string[];
}

const MenuDrawerContent = (props: MenuDrawerContentProps) => {
    const { menuItems } = props;
    return (
        <ul className={clsx('mdc_container', Graphik.className)}>
            {menuItems.map((menuItem) => {
                return (
                    <li key={menuItem}>
                        <p>{menuItem}</p>
                        <DropListArrowIcon />
                    </li>
                );
            })}
        </ul>
    );
};

export default MenuDrawerContent;
