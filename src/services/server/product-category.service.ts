import { SupportedLanguages } from '@/i18n/settings';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { HttpService } from '@/services/server/http.service';
import { HttpException } from '@/shared/http-exception/HttpException';

const httpService = HttpService.instance;

interface ProductCategoryState {
    list?: ProductCategory[];
}

interface INotifyOptions {
    state: ProductCategoryState;
}

export interface ProductCategory {
    id: string;
    imagePath: string | null;
    parentCategoryId: string | null;
    translations: {
        locale: SupportedLanguages;
        name: string;
        description: string | null;
    };
    hasChildren: boolean;
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

            PRODUCT_CATEGORY(id: string) {
                return `product-category/${id}`;
            },
        };
    }

    async list({ locale }: { locale: SupportedLanguages }): Promise<{
        success: boolean;
        data?: ProductCategory[];
        message?: string;
    }> {
        return httpService
            .get<ProductCategory[]>({
                path: ProductCategoryService.endpoints.ALL_PRODUCT_CATEGORIES,
                queryParams: {
                    locale,
                    where: [
                        {
                            operands: ['parentCategoryId', null],
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
}

export interface IWhere {
    operator:
        | 'is'
        | 'is_not'
        | 'eq'
        | 'not'
        | 'in'
        | 'not_in'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'contains'
        | 'not_contains'
        | 'starts_with'
        | 'ends_with'
        | 'not_starts_with'
        | 'not_ends_with';
    andOr?: 'andWhere' | 'orWhere';
    parentAndOr?: 'andWhere' | 'orWhere';
    parentNot?: boolean;

    operands: [string, string | null | boolean];
}
