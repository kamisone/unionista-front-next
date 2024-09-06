import { SupportedLanguages } from '@/i18n/settings';
import React from 'react';
import styles from '@/components/user-home/mobile/MobileHome.module.css';
import clsx from 'clsx';
import { i18nTranslation } from '@/i18n';

interface MobileHomeProps {
    lng: SupportedLanguages;
    isUserAuthenticated: boolean;
}

const MobileHome = ({ lng, isUserAuthenticated }: MobileHomeProps) => {
    const t = i18nTranslation(lng, 'mobile_body');
    const productCategories = [
        {
            imagePath:
                'https://i0.wp.com/helloemilyerin.com/wp-content/uploads/2021/04/Copy-of-Gold-Black-Friday-Clothing-Flyer-1.png?fit=1080%2C1080&ssl=1',
            title: 'Gifts for Mom',
        },
        {
            imagePath:
                'https://images-cdn.ubuy.co.in/635780cd8dad093195387712-birthday-gifts-for-women-relaxing-spa.jpg',
            title: 'Birthday Gifts',
        },
        {
            imagePath:
                'https://media.glamour.com/photos/64272f70012d1164084e2d3b/master/pass/3-30-wedding-anniversary-gifts.jpg',
            title: 'Anniversary Gifts',
        },
        {
            imagePath: 'https://m.media-amazon.com/images/I/71v1k6cTFuL.jpg',
            title: 'Wedding & Engagement Gifts',
        },
    ];
    return (
        <section className={clsx(styles.container)}>
            <div>
                <h3>{t('featured.categories_title')}</h3>
                <div className={styles.categories}>
                    {productCategories.map((pCategory) => (
                        <figure key={pCategory.title}>
                            <img
                                src={pCategory.imagePath}
                                alt={pCategory.title}
                            />
                            <figcaption>{pCategory.title}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MobileHome;
