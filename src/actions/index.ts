'use server';

import { SupportedLanguages } from '@/i18n/settings';
import { SnackbarSeverity } from '@/services/browser/snackbar.service';
import {
    ProductCategory,
    ProductCategoryService,
} from '@/services/server/product-category.service';
import { modalContentNames, PATHNAME_HEADER_NAME } from '@/utils/constants';
import { stripQueryParamFromUrl } from '@/utils/query-params';
import { addServerToastsCookie } from '@/utils/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const productCategoryService = ProductCategoryService.instance;

export async function fetchAllProductsCategories(lng: SupportedLanguages) {
    const response = await productCategoryService.listAll({
        locale: lng,
    });

    if (response.success) {
        return response.data as ProductCategory[];
    }

    return [];
}
export async function fetchParentsProductsCategories(lng: SupportedLanguages) {
    const response = await productCategoryService.listParents({
        locale: lng,
    });

    if (response.success) {
        return response.data as ProductCategory[];
    }

    return [];
}

export async function fetchChildrenProductsCategories({
    parentId,
    lng,
}: {
    parentId: string;
    lng: SupportedLanguages;
}) {
    const response = await productCategoryService.listChildren({
        locale: lng,
        parentId,
    });

    if (response.success) {
        return response.data as ProductCategory[];
    }

    return [];
}

export async function saveProductCategory(data: FormData) {
    const response = await productCategoryService.save(data);

    if (!response.success) {
        addServerToastsCookie(
            'Error saving product category: ' + response.message,
            SnackbarSeverity.ERROR
        );
        return;
    }

    const pathWithSearch = headers().get(PATHNAME_HEADER_NAME) || '';

    addServerToastsCookie(
        'Successfuly created category',
        SnackbarSeverity.SUCCESS
    );
    return redirect(
        stripQueryParamFromUrl(pathWithSearch, modalContentNames.QUERY_NAME)
    );
}
