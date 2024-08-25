import { AxiosError } from 'axios';
import { HttpService } from '@/services/server/http.service';
import { SupportedLanguages } from '@/i18n/settings';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';
import { headers } from 'next/headers';

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

    async list({
        locale,
    }: {
        locale: SupportedLanguages;
    }): Promise<ProductCategory[]> {
        try {
            const response = await httpService.get<ProductCategory[]>({
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
            });

            return response;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status >= 500) {
                    // snackbarService.openSnackbar({
                    //     message: `Error: ${
                    //         error.response.data?.message ?? error.message
                    //     }`,
                    //     severity: SnackbarSeverity.ERROR,
                    // });
                } else {
                    throw error;
                }
            }
            return [];
        }
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
