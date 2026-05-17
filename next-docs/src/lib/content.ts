import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

export interface ContentItem {
  slug: string;
  title: string;
  type: string;
  order: number;
  content: string;
}

export function getAllContent(): ContentItem[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  const items = files.map(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Slug is filename without extension
    const slug = file.replace(/\\.(md|mdx)$/, '');
    
    return {
      slug,
      title: data.title || slug,
      type: data.type || 'other',
      order: data.order || 999,
      content
    };
  });
  
  return items.sort((a, b) => {
    if (a.type !== b.type) {
      const typeOrder: any = { lld: 1, docx: 2, pdf: 3, resource: 4, other: 5 };
      return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
    }
    return a.order - b.order;
  });
}

export function getContentBySlug(slug: string): ContentItem | null {
  const items = getAllContent();
  return items.find(item => item.slug === slug) || null;
}
