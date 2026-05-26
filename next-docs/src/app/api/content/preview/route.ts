import { NextResponse } from 'next/server';
import { compile } from '@mdx-js/mdx';
import MarkdownIt from 'markdown-it';
import { getAllContent } from '@/lib/content';

const markdown = new MarkdownIt({ html: true, linkify: true });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || '25');

  const items = getAllContent().slice(0, Number.isFinite(limit) ? Math.max(1, limit) : 25);
  const errors: Array<{ slug: string; error: string }> = [];

  const previews = await Promise.all(
    items.map(async (item) => {
      if (item.type === 'docx' || item.type === 'pdf') {
        try {
          await compile(item.content, {
            jsx: false,
            outputFormat: 'function-body',
            providerImportSource: '@mdx-js/react',
          });
        } catch (error) {
          errors.push({ slug: item.slug, error: String(error) });
        }
      }

      const html = markdown.render(item.content);

      return {
        slug: item.slug,
        title: item.title,
        type: item.type,
        html,
      };
    })
  );

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: 'Preview generation failed for one or more files', errors },
      { status: 422 }
    );
  }

  return NextResponse.json({ ok: true, total: previews.length, previews });
}
