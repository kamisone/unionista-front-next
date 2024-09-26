import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
    params: { lng },
}: {
    params: { lng: SupportedLanguages };
}) {
    const t = i18nTranslation(lng, 'metadata');
    return {
        title: t('cart-home.title'),
        description: t('cart-home.description'),
    };
}

const CartHome = () => {
    return <h2>Cart home</h2>;
};

export default CartHome;
