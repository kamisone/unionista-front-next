'use server';

import { SupportedLanguages } from '@/i18n/settings';
import { ProductCategory } from '@/services/product-category.service';
import { ProductCategoryService } from '@/services/server/product-category.service';

const productCategoryService = ProductCategoryService.instance;

export async function fetchProductsCategories(lng: SupportedLanguages) {
    const response = await productCategoryService.list({
        locale: lng,
    });

    if (response.success) {
        return response.data as ProductCategory[];
    }

    return [];
}
