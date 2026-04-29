import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://thaydoitamthuc.com/sitemap.xml',
  };
}
User-agent: *
Allow: /
Sitemap: https://gtcn.thaydoitamthuc.com/sitemap.xml