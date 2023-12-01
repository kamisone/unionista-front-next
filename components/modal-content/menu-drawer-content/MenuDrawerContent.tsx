import DropListArrowIcon from '@/icons/drop-list-arrow/DropListArrowIcon';
import React from 'react';
import propTypes from 'prop-types';
import 'components/modal-content/menu-drawer-content/MenuDrawerContent.css';

interface MenuDrawerContentProps {
    menuItems: string[];
}

const MenuDrawerContent = (props: MenuDrawerContentProps) => {
    const { menuItems } = props;
    return (
        <ul className="mdc_container">
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
