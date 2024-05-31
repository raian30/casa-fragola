import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['hr', 'en', 'it', 'de', 'fr'];

export default getRequestConfig(async ({locale}) => {
    //Da li postoji taj jezik, ako ne salje NotFound
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});