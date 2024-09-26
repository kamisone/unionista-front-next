import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('admin-settings-home.title'),
        description: t('admin-settings-home.description'),
    };
}

export default function SettingsPage() {
    return (
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            beatae quibusdam dolor dicta suscipit repellat corporis deleniti
            odio, ratione, vero rerum quam inventore illo id! Nulla earum minima
            veritatis accusantium distinctio harum eveniet ipsam labore
            consequatur veniam corrupti totam, fugiat facere hic doloribus id
            molestias nisi nihil, quaerat ex maiores suscipit, vitae quo?
            Voluptas nostrum sit laboriosam ut. Accusantium doloribus possimus
            eligendi, laborum, eos blanditiis quas enim doloremque dicta
            consectetur, ab unde quasi labore similique voluptate? Harum
            voluptate tenetur, commodi, ea veritatis itaque qui beatae,
            molestiae deserunt ullam eligendi necessitatibus laborum error
            tempora eos totam repellat aliquid corrupti. Tempora praesentium
            similique nesciunt nobis id repellat quod modi magni, minima unde
            eum veniam obcaecati quas debitis placeat cupiditate reprehenderit,
            dolor natus corporis cum. Voluptatum similique delectus vero
            exercitationem illum cupiditate perferendis minima eum eius quasi!
            Tempore nostrum enim beatae aut necessitatibus non distinctio
            aspernatur veniam eveniet esse quisquam molestiae blanditiis ducimus
            quod harum ea illo ab nulla, illum repellendus? Voluptatum cumque ad
            modi ipsa quas reprehenderit iusto quos. Voluptatem nemo placeat
            perferendis saepe, dolorem delectus ratione dolor in eos dolores
            provident corporis nobis vel distinctio harum? Labore vero
            accusantium a deserunt nesciunt? Et ullam molestiae exercitationem
            nam assumenda, nesciunt molestias accusantium.
        </p>
    );
}
