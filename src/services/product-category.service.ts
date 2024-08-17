import { AxiosError } from 'axios';
import { SupportedLanguages } from '../i18n/settings';
import { HttpService } from '@/services/http.service';
import { SnackbarService, SnackbarSeverity } from '@/services/snackbar.service';
import { ComponentsStateNotify } from '@/services/components-state-notify.service';

const httpService = HttpService.getInstance();
const snackbarService = SnackbarService.getInstance();

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
    static myInstance: ProductCategoryService;

    static getInstance() {
        if (!ProductCategoryService.myInstance) {
            ProductCategoryService.myInstance = new ProductCategoryService({
                list: undefined,
            });
        }
        return this.myInstance;
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
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status >= 500) {
                    snackbarService.openSnackbar({
                        message: `Error: ${
                            error.response.data?.message ?? error.message
                        }`,
                        severity: SnackbarSeverity.ERROR,
                    });
                } else {
                    throw new Error(error.response.data?.message);
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
