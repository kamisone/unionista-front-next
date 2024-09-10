'use server';

import { SupportedLanguages } from '@/i18n/settings';
import { ProductCategoryService } from '@/services/server/product-category.service';

const productCategoryService = ProductCategoryService.instance;
// const modalService = ModalService.instance;

export async function fetchProductsCategories(lng: SupportedLanguages) {
    const productCategories = await productCategoryService.list({
        locale: lng,
    });
    return productCategories;
}

// export async function openModal(content: ModalContentMapping) {
//     modalService.state = {
//         isModalOpen: true,
//         currentModalContent: content,
//     };
//     console.log('modal: ', modalService.state);
// }
