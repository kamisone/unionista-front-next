import { fetchAllProductsCategories, saveProductCategory } from '@/actions';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import FieldsetSelectInput from '@/shared/fieldset-select-input/FieldsetSelectInput';
import FieldsetTextInput from '@/shared/fieldset-text-input/FieldsetTextInput';
import FieldsetTextareaInput from '@/shared/fieldset-textarea-input/FieldsetTextareaInput';
import LinkTransparentButton from '@/shared/link-transparent-button/LinkTransparentButton';
import {
    LANGUAGE_FILTER_QUERY_NAME,
    modalContentNames,
} from '@/utils/constants';
import styles from '@/app/[lng]/(admin)/admin/listings/page.module.css';
import clsx from 'clsx';
import AdminPageLayout from '@/components/layouts/admin-page-layout/AdminPageLayout';
import { ModalContentMapping } from '@/utils/modal';
import ActionButton from '@/shared/action-button/ActionButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('admin-listings-home.title'),
        description: t('admin-listings-home.description'),
    };
}

interface ListingsPageProps {
    params: { lng: SupportedLanguages };
    searchParams: Record<string, string>;
}

export default async function ListingsPage({
    params,
    searchParams,
}: ListingsPageProps) {
    const menuItems = await fetchAllProductsCategories(
        searchParams[LANGUAGE_FILTER_QUERY_NAME] as SupportedLanguages
    );
    return (
        <AdminPageLayout searchParams={searchParams} params={params}>
            <div className="">
                <h3>Categories</h3>
                <details
                    className={clsx(
                        styles.details,
                        'relative w-fit border-[0.1px] border-solid border-primary rounded-sm py-1 px-4 cursor-pointer'
                    )}
                >
                    <summary>languages</summary>
                    <div className="bg-white border-primary border-[0.1px] border-solid absolute left-0 w-full flex items-center justify-around gap-1">
                        <LinkTransparentButton
                            deleteQuerySearch={LANGUAGE_FILTER_QUERY_NAME}
                        >
                            <span>all</span>
                        </LinkTransparentButton>
                        {Object.values(SupportedLanguagesEnum).map((lng) => {
                            return (
                                <LinkTransparentButton
                                    key={lng}
                                    addQuerySearch={{
                                        key: LANGUAGE_FILTER_QUERY_NAME,
                                        value: lng,
                                    }}
                                    utilityClasses="block p-1"
                                >
                                    <span>{lng}</span>
                                </LinkTransparentButton>
                            );
                        })}
                    </div>
                </details>
                <table border={1} className="w-full">
                    <tbody>
                        <tr>
                            <th>name</th>
                            <th>description</th>
                            <th>parent</th>
                            <th>actions</th>
                        </tr>
                        {menuItems.map((pc) => {
                            return (
                                <tr key={pc.id}>
                                    <td>{pc.translations.name}</td>
                                    <td>{pc.translations.description}</td>
                                    <td>{pc.parentId}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h3 className="mt-4">Create category</h3>
                <LinkTransparentButton
                    addQuerySearch={{
                        key: modalContentNames.QUERY_NAME,
                        value: ModalContentMapping.PRODUCT_CATEGERY_CREATE,
                    }}
                >
                    <ActionButton lng={params.lng}  variant='primary' radius='pilled'>create</ActionButton>
                </LinkTransparentButton>
                
            </div>
        </AdminPageLayout>
    );
}
