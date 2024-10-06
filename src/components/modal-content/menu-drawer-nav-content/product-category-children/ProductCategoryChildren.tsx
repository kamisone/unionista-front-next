'use client';

import { fetchChildrenProductsCategories } from '@/actions';
import { SupportedLanguages } from '@/i18n/settings';
import RightBottomArrowIcon from '@/icons/right-bottom-arrow-icon/RightBottomArrowIcon';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/services/browser/product-category.service';
import LoadingIndicator from '@/shared/loading-indicator/LoadingIndicator';
import { useState } from 'react';

interface ProductCategoryChildrenProps {
    lng: SupportedLanguages;
    parentId: string;
    isMobile?: boolean;
}

const productCategoryService = ProductCategoryService.instance;

export default function ProductCategoryChildren({
    parentId,
    lng,
    isMobile,
}: ProductCategoryChildrenProps) {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [children, setChildren] = useState<ProductCategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <button
                onClick={() => {
                    setIsDisplayed((prev) => !prev);
                    if (children.length) return;
                    setIsLoading(true);
                    productCategoryService
                        .listChildren({
                            parentId,
                            locale: lng,
                        })
                        .then((response) => {
                            setIsLoading(false);
                            response.success &&
                                setChildren(response.data as ProductCategory[]);
                        });
                }}
            >
                <RightBottomArrowIcon
                    isActive={isDisplayed}
                    isMobile={isMobile}
                />
            </button>

            {isLoading && isDisplayed ? (
                <LoadingIndicator size="1rem" />
            ) : (
                isDisplayed && (
                    <ul>
                        {children.map((child) => (
                            <p key={child.id}>{child.translations.name}</p>
                        ))}
                    </ul>
                )
            )}
        </>
    );
}
