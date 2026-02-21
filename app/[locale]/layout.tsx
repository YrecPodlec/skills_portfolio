import { setRequestLocale } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import React from "react";
import {notFound} from "next/navigation";

type Props = {

    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}
export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // 🔹 Устанавливаем локаль для server translations
    setRequestLocale(locale);

    // 🔹 Загружаем messages для client provider
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
