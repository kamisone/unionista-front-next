import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'UnShop',
    description:
        "Discover a world of endless possibilities at UnionsitaShop, your one-stop destination for all types of products. From trendy fashion essentials and cutting-edge electronics to home decor that transforms spaces, we've curated a diverse collection to cater to your every need. Shop with confidence, knowing that quality and variety define our offerings. Join our community of satisfied customers who have experienced the convenience of finding everything they desire in one place. Explore UnionsitaShop today and redefine your shopping experience! #UnionsitaShop #OneYearAnniversary #ShopWithStyle",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </StoreProvider>
    );
}
