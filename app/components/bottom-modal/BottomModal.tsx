'use client';
import ModalSpot from '@/app/shared/modal-spot/ModalSpot';
import { ModalContentMapping } from '@/app/utils/bottom-modal';
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
import { BottomModalService } from '@/app/services/bottom-modal.service';

const productCategoryService = ProductCategoryService.getInstance();
const bottomModalService = BottomModalService.getInstance();

interface BottomModalProps {
    lng: SupportedLanguages;
}

const BottomModal = ({ lng }: BottomModalProps) => {
    const [productCategories, setProductCategories] = useState(
        productCategoryService.state.list
    );

    const [currentBottomModalContent, setBottomModalContent] = useState(
        bottomModalService.state.currentBottomModalContent
    );
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(
        bottomModalService.state.isBottomModalOpen
    );
    const searchParams = useSearchParams();

    useEffect(() => {
        if (
            !productCategories &&
            currentBottomModalContent === ModalContentMapping.MENU_DRAWER
        ) {
            productCategoryService.list({ locale: lng }).then((data) => {
                if (data) {
                    productCategoryService.state = {
                        list: data,
                    };
                }
            });
        }
    }, [currentBottomModalContent]);

    //initialize bottom modal state
    useEffect(() => {
        const searchParamsUrl = new URLSearchParams(
            Array.from(searchParams.entries())
        );
        if (searchParamsUrl.has(FrontQueryParams.MODAL_CONTENT)) {
            bottomModalService.state = {
                isBottomModalOpen: true,
                currentBottomModalContent: searchParams.get(
                    FrontQueryParams.MODAL_CONTENT
                ) as ModalContentMapping,
            };
        }
    }, []);

    // set Notifiers
    useEffect(() => {
        productCategoryService.addNotifier(
            (options) => options && setProductCategories(options.state.list)
        );

        bottomModalService.addNotifier((options) => {
            if (options) {
                setIsBottomModalOpen(options.state.isBottomModalOpen);
                setBottomModalContent(options.state.currentBottomModalContent);
            }
        });
    }, []);

    if (!isBottomModalOpen) {
        return null;
    }

    switch (currentBottomModalContent) {
        case ModalContentMapping.MENU_DRAWER:
            return (
                <ModalSpot lng={lng}>
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
};

export default BottomModal;
