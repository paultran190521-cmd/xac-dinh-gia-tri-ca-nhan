import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // If we had dynamic routes like articles or user profiles fetched from Google Sheets, 
  // we would fetch them here and map to the array.
  
  const baseUrl = process.env.APP_URL || 'https://gtcn.thaydoitamthuc.com';
  
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
