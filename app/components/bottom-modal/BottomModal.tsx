'use client';

import { useAppSelector } from '@/app/lib/store';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
import MenuDrawerContent from '@/app/components/modal-content/menu-drawer-content/MenuDrawerContent';
import LoginContent from '@/app/components/modal-content/login-in-content/LoginContent';
import { SupportedLanguages } from '@/app/i18n/settings';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/app/services/product-category.service';
import { useEffect, useState } from 'react';

const productCategoryService = ProductCategoryService.getInstance();

// const menuItems = [
//     'Early Christmas Deals',
//     'Jewelry & Accessories',
//     'Clothing & shoes',
//     'Home & Living',
//     'Wedding & party',
//     'toys & entertainment',
//     'art & collectibles',
//     'craft supplies & tools',
//     'etsy registry',
// ];

interface BottomModalProps {
    lng: SupportedLanguages;
}

const BottomModal = ({ lng }: BottomModalProps) => {
    const headerState = useAppSelector((state) => state.header);
    const [productCategories, setProductCategories] = useState<
        ProductCategory[]
    >([]);

    useEffect(() => {
        productCategoryService.list({ locale: lng }).then((data) => {
            if (data) {
                setProductCategories(data);
            }
        });
    }, []);

    if (!headerState.isBottomModalOpen) {
        return null;
    }

    return _BottomModalContent(
        headerState.currentContent,
        productCategories,
        lng
    );
};

function _BottomModalContent(
    currentContent: ModalContentMapping | null,
    menuItems: any,
    lng: SupportedLanguages
) {
    switch (currentContent) {
        case ModalContentMapping.MENU_DRAWER:
            return (
                <ModalSpot lng={lng}>
                    <MenuDrawerContent menuItems={menuItems} lng={lng} />
                </ModalSpot>
            );
        case ModalContentMapping.SIGN_IN:
        case ModalContentMapping.SIGN_UP:
            return (
                <ModalSpot lng={lng}>
                    <LoginContent lng={lng} />
                </ModalSpot>
            );

        default:
            return (
                <ModalSpot lng={lng}>
                    <h2>no content found</h2>{' '}
                </ModalSpot>
            );
    }
}

export default BottomModal;
