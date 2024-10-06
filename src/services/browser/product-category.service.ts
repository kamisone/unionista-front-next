import { SupportedLanguages } from '@/i18n/settings';
import { HttpService } from '@/services/browser/http.service';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpException } from '@/shared/http-exception/HttpException';
import { ListResponseType, PostResponseType } from '../types/http';

interface ProductCategoryState {
    list?: ProductCategory[];
}

interface INotifyOptions {
    state: ProductCategoryState;
}

const httpService = HttpService.instance;

export interface ProductCategory {
    id: string;
    imageUrl: string | null;
    slug: string;
    parentId: string | null;
    translations: {
        locale: SupportedLanguages;
        name: string;
        description: string | null;
    };
    hasChildren: boolean;
    children?: ProductCategory[];
}

export class ProductCategoryService extends ComponentsStateNotify<
    ProductCategoryState,
    INotifyOptions
> {
    constructor(initialState: ProductCategoryState) {
        super(initialState);
    }

    private static _instance: ProductCategoryService;

    static get instance() {
        if (!this._instance) {
            this._instance = new ProductCategoryService({
                list: undefined,
            });
        }

        return this._instance;
    }

    static get endpoints() {
        return {
            ALL_PRODUCT_CATEGORIES: 'product-category',
            PRODUCT_CATEGORIES: 'product-category',

            PRODUCT_CATEGORY(id: string) {
                return `product-category/${id}`;
            },
        };
    }

    async listAll({
        locale,
    }: {
        locale: SupportedLanguages;
    }): Promise<ListResponseType<ProductCategory>> {
        return httpService
            .get<ProductCategory[]>({
                path: ProductCategoryService.endpoints.ALL_PRODUCT_CATEGORIES,
                queryParams: {
                    locale: locale ? locale : undefined,
                },
            })
            .then((data) => ({
                success: true,
                data,
            }))
            .catch((error: HttpException) => {
                return {
                    success: false,
                    message: error.message,
                };
            });
    }
    async listParents({
        locale,
    }: {
        locale: SupportedLanguages;
    }): Promise<ListResponseType<ProductCategory>> {
        return httpService
            .get<ProductCategory[]>({
                path: ProductCategoryService.endpoints.ALL_PRODUCT_CATEGORIES,
                queryParams: {
                    locale,
                    // relations: ['children'],
                    where: [
                        {
                            operands: ['parentId', null],
                            operator: 'is',
                        },
                    ],
                },
            })
            .then((data) => ({
                success: true,
                data,
            }))
            .catch((error: HttpException) => {
                return {
                    success: false,
                    message: error.message,
                };
            });
    }

    async listChildren({
        parentId,
        locale,
    }: {
        parentId: string;
        locale: SupportedLanguages;
    }): Promise<ListResponseType<ProductCategory>> {
        return httpService
            .get<ProductCategory[]>({
                path: ProductCategoryService.endpoints.ALL_PRODUCT_CATEGORIES,
                queryParams: {
                    locale,
                    where: [
                        {
                            operands: ['parentId', parentId],
                            operator: 'is',
                        },
                    ],
                },
            })
            .then((data) => ({
                success: true,
                data,
            }))
            .catch((error: HttpException) => {
                return {
                    success: false,
                    message: error.message,
                };
            });
    }
    async save(data: FormData): Promise<PostResponseType<ProductCategory>> {
        return httpService
            .post<ProductCategory>({
                path: ProductCategoryService.endpoints.PRODUCT_CATEGORIES,
                body: data,
            })
            .then((data) => ({
                success: true,
                data,
            }))
            .catch((error: HttpException) => ({
                success: false,
                message: error.message,
            }));
    }
}
