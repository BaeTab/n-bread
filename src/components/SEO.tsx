import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    image?: string;
    structuredData?: Record<string, any>;
}

export default function SEO({
    title,
    description,
    keywords,
    url,
    image,
    structuredData
}: SEOProps) {
    const siteUrl = 'https://n-bread-n.web.app';
    const currentUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : window.location.href;
    const defaultImage = `${siteUrl}/og-image.png`;
    const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    return (
        <Helmet>
            <title>{title} | N-BREAD</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={currentUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
