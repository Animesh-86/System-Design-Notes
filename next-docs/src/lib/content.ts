import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');
const CONTENT_FILE_REGEX = /\.(md|mdx)$/i;

export interface ContentItem {
  slug: string;
  title: string;
  type: string;
  order: number;
  content: string;
}

export function getAllContent(dir: string = contentDir): ContentItem[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => CONTENT_FILE_REGEX.test(file))
    .filter((file) => fs.statSync(path.join(dir, file)).isFile());

  const seenSlugs = new Set<string>();
  const items = files
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Slug is filename without extension
      const slug = file.replace(CONTENT_FILE_REGEX, '');
      if (!slug || seenSlugs.has(slug)) {
        return null;
      }
      seenSlugs.add(slug);

      return {
        slug,
        title: data.title || slug,
        type: data.type || 'other',
        order: Number(data.order || 999),
        content,
      };
    })
    .filter((item): item is ContentItem => item !== null);

  return items.sort((a, b) => {
    if (a.type !== b.type) {
      const typeOrder: Record<string, number> = { lld: 1, docx: 2, pdf: 3, resource: 4, other: 5 };
      return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
    }
    return a.order - b.order;
  });
}

export function getContentBySlug(slug: string, dir?: string): ContentItem | null {
  const items = getAllContent(dir);
  return items.find(item => item.slug === slug) || null;
}
