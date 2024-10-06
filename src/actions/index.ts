'use server';

import { SupportedLanguages } from '@/i18n/settings';
import { ProductCategory } from '@/services/server/product-category.service';
import { ProductCategoryService } from '@/services/server/product-category.service';

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

    if (response.success) {
        return response.data as ProductCategory;
    }

    return response;
}
