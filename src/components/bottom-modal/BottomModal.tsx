'use client';
import LoginContent from '@/components/modal-content/login-in-content/LoginContent';
import MenuDrawerNavContent from '@/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent';
import { SupportedLanguages } from '@/i18n/settings';
import {
    ProductCategoryService
} from '@/services/product-category.service';
import ModalSpot from '@/shared/modal-spot/ModalSpot';
import { ModalContentMapping } from '@/utils/modal';
import { useEffect, useState } from 'react';

import { ModalService } from '@/services/modal.service';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';

const productCategoryService = ProductCategoryService.instance;
const modalService = ModalService.instance;

interface ModalProps {
    lng: SupportedLanguages;
}

const BottomModal = ({ lng }: ModalProps) => {
    const [productCategories, setProductCategories] = useState(
        productCategoryService.state.list
    );

    const [currentModalContent, setModalContent] = useState(
        modalService.state.currentModalContent
    );

    useEffect(() => {
        if (
            
            currentModalContent === ModalContentMapping.MENU_DRAWER
        ) {
            productCategoryService.list({ locale: lng }).then((data) => {
                if (data) {
                    productCategoryService.state = {
                        list: data,
                    };
                }
            });
        }
    }, [currentModalContent]);

    useEffect(() => {
        // set Notifiers
        productCategoryService.addNotifier(
            (options) => {
                options && setProductCategories(options.state.list)
            }
        );

        modalService.addNotifier((options) => {
            if (options) {
                setModalContent(options.state.currentModalContent);
            }
        });

    }, []);

    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            return (
                <ModalSpot lng={lng} headingTitle="Categories">
                    {productCategories ? (
                        <MenuDrawerNavContent
                            menuItems={productCategories}
                            lng={lng}
                        />
                    ) : (
                        <LoadingIndicator />
                    )}
                </ModalSpot>
            );
        case ModalContentMapping.SIGN_IN:
        case ModalContentMapping.SIGN_UP:
            return (
                <ModalSpot lng={lng} headingTitle="SignIn/SignUp">
                    <LoginContent lng={lng} />
                </ModalSpot>
            );

        default:
            return (
                <ModalSpot lng={lng} headingTitle="Not found">
                    <h2>no content found</h2>{' '}
                </ModalSpot>
            );
    }
};

export default BottomModal;
