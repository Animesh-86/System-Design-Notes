import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { compile } from '@mdx-js/mdx';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'src', 'content');
const md = new MarkdownIt({ html: true, linkify: true, typographer: false });

function listContentFiles() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .filter((file) => fs.statSync(path.join(contentDir, file)).isFile());
}

async function run() {
  const files = listContentFiles();
  const errors = [];
  const previews = [];

  for (const file of files) {
    const abs = path.join(contentDir, file);
    const raw = fs.readFileSync(abs, 'utf8');
    const parsed = matter(raw);

    if (/\.mdx$/i.test(file)) {
      try {
        await compile(parsed.content, {
          jsx: false,
          outputFormat: 'function-body',
          providerImportSource: '@mdx-js/react',
        });
      } catch (error) {
        errors.push({ file, stage: 'mdx-compile', error: String(error) });
        continue;
      }
    }

    try {
      const html = md.render(parsed.content);
      previews.push({ file, htmlLength: html.length, title: parsed.data?.title || file });
    } catch (error) {
      errors.push({ file, stage: 'html-render', error: String(error) });
    }
  }

  if (errors.length > 0) {
    console.error('Content preview validation failed.');
    console.error(JSON.stringify({ errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log('Content preview validation passed.');
  console.log(JSON.stringify({ validatedFiles: files.length, previews: previews.slice(0, 20) }, null, 2));
}

run().catch((error) => {
  console.error('content:preview failed:', error);
  process.exitCode = 1;
});
