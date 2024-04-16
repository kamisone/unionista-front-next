'use client';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import { ModalContentMapping } from '@/app/utils/modal';
import MenuDrawerNavContent from '@/app/components/modal-content/menu-drawer-nav-content/MenuDrawerNavContent';
import LoginContent from '@/app/components/modal-content/login-in-content/LoginContent';
import { SupportedLanguages } from '@/app/i18n/settings';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/app/services/product-category.service';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FrontQueryParams } from '@/app/utils/query-params';
import LoadingIndicator from '@/app/shared/loading-indicator/LoadingIndicator';
import { ModalService } from '@/app/services/modal.service';

const productCategoryService = ProductCategoryService.getInstance();
const modalService = ModalService.getInstance();

interface ModalProps {
    lng: SupportedLanguages;
}

const Modal = ({ lng }: ModalProps) => {
    const [productCategories, setProductCategories] = useState(
        productCategoryService.state.list
    );

    const [currentModalContent, setModalContent] = useState(
        modalService.state.currentModalContent
    );
    const [isModalOpen, setIsModalOpen] = useState(
        modalService.state.isModalOpen
    );
    const searchParams = useSearchParams();

    useEffect(() => {
        if (
            !productCategories &&
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
            (options) => options && setProductCategories(options.state.list)
        );

        modalService.addNotifier((options) => {
            if (options) {
                setIsModalOpen(options.state.isModalOpen);
                setModalContent(options.state.currentModalContent);
            }
        });

        // initialize bottom modal state
        const searchParamsUrl = new URLSearchParams(
            Array.from(searchParams.entries())
        );
            
        if (searchParamsUrl.has(FrontQueryParams.MODAL_CONTENT)) {
            modalService.state = {
                isModalOpen: true,
                currentModalContent: searchParams.get(
                    FrontQueryParams.MODAL_CONTENT
                ) as ModalContentMapping,
            };
        }
    }, []);

    if (!isModalOpen) {
        return null;
    }

    switch (currentModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            return (
                <ModalSpot lng={lng} headingTitle='Categories'>
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
                <ModalSpot lng={lng} headingTitle='SignIn/SignUp'>
                    <LoginContent lng={lng} />
                </ModalSpot>
            );

        default:
            return (
                <ModalSpot lng={lng} headingTitle='Not found'>
                    <h2>no content found</h2>{' '}
                </ModalSpot>
            );
    }
};

export default Modal;
