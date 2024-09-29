import { fetchProductsCategories } from '@/actions';
import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import FieldsetSelectInput from '@/shared/fieldset-select-input/FieldsetSelectInput';
import FieldsetTextInput from '@/shared/fieldset-text-input/FieldsetTextInput';
import FieldsetTextareaInput from '@/shared/fieldset-textarea-input/FieldsetTextareaInput';

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
}

export default async function ListingsPage({
    params: { lng },
}: ListingsPageProps) {
    const menuItems = await fetchProductsCategories(lng);
    return (
        <div className="max-w-96">
            <h3>Categories</h3>
            <form action="" className="mt-4 grid gap-4">
                <FieldsetTextInput
                    lng={lng}
                    name="name"
                    label="categorie name"
                />

                <FieldsetSelectInput
                    lng={lng}
                    name="parent"
                    label="parent"
                    options={[
                        {
                            key: 'mine1',
                            value: 'mine1',
                        },
                        {
                            key: 'mine',
                            value: 'mine',
                        },
                    ]}
                    utilities="z-[1]"
                />

                <FieldsetTextareaInput
                    lng={lng}
                    name="description"
                    label="description"
                />
            </form>
        </div>
    );
}
