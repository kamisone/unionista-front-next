import { fetchAllProductsCategories, saveProductCategory } from '@/actions';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import FieldsetSelectInput from '@/shared/fieldset-select-input/FieldsetSelectInput';
import FieldsetTextInput from '@/shared/fieldset-text-input/FieldsetTextInput';
import FieldsetTextareaInput from '@/shared/fieldset-textarea-input/FieldsetTextareaInput';
import { LANGUAGE_FILTER_QUERY_NAME } from '@/utils/constants';
import clsx from 'clsx';

interface ProductCategoryCreateContentProps {
    lng: SupportedLanguages;
    searchParams: { [key: string]: string | undefined };
    isMobile: boolean;
}

export default async function ProductCategoryCreateContent({
    lng,
    searchParams,
    isMobile,
}: ProductCategoryCreateContentProps) {
    const menuItems = await fetchAllProductsCategories(
        searchParams[LANGUAGE_FILTER_QUERY_NAME] as SupportedLanguages
    );
    return (
        <form
            action={saveProductCategory}
            className={clsx('mt-4 grid content-start gap-2', isMobile ? 'px-2' : 'px-4')}
        >
            <fieldset className='grid gap-2 p-2'>
                <legend className='mx-4'>fill in these inputs</legend>
                <FieldsetTextInput
                    lng={lng}
                    name="name"
                    label="categorie name"
                />
                <FieldsetTextInput
                    lng={lng}
                    name="slug"
                    label="categorie slug"
                />

                <FieldsetSelectInput
                    lng={lng}
                    name="parentId"
                    label="parent"
                    options={menuItems.map((pc) => ({
                        key: pc.translations.name,
                        value: pc.id,
                    }))}
                    utilities="z-[2]"
                />
                <FieldsetSelectInput
                    lng={lng}
                    name="locale"
                    label="locale"
                    options={Object.values(SupportedLanguagesEnum).map(
                        (value) => ({
                            key: value,
                            value: value,
                        })
                    )}
                    utilities="z-[1]"
                />

                <FieldsetTextareaInput
                    lng={lng}
                    name="description"
                    label="description"
                />
            </fieldset>

            <button type="submit">Save</button>
        </form>
    );
}
