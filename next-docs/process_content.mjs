import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'src', 'content');
const publicImagesDir = path.join(__dirname, 'public', 'images');
const publicPdfsDir = path.join(__dirname, 'public', 'pdfs');
const ALLOWED_TYPES = new Set(['lld', 'docx', 'pdf', 'resource', 'other']);
const SAFE_CONTENT_FILE_REGEX = /^[a-z0-9][a-z0-9._-]*\.(md|mdx)$/i;

function ensureDirectories() {
  [contentDir, publicImagesDir, publicPdfsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

export function sanitizeSlug(rawValue) {
  return String(rawValue || '')
    .toLowerCase()
    .replace(/\?.*$/, '')
    .replace(/#.*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function assertSafeFilename(fileName) {
  if (!SAFE_CONTENT_FILE_REGEX.test(fileName)) {
    throw new Error(`Unsafe filename generated: ${fileName}`);
  }
}

function validateFrontmatterForFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  if (!data.title || typeof data.title !== 'string') {
    throw new Error(`Missing or invalid title in frontmatter: ${path.basename(filePath)}`);
  }

  if (!data.type || typeof data.type !== 'string' || !ALLOWED_TYPES.has(data.type)) {
    throw new Error(`Missing or invalid type in frontmatter: ${path.basename(filePath)}`);
  }

  const order = Number(data.order);
  if (!Number.isFinite(order)) {
    throw new Error(`Missing or invalid order in frontmatter: ${path.basename(filePath)}`);
  }
}

export function validateGeneratedContent(dir = contentDir) {
  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .filter((file) => fs.statSync(path.join(dir, file)).isFile());

  const seenSlugs = new Set();
  for (const file of files) {
    assertSafeFilename(file);
    const slug = file.replace(/\.(md|mdx)$/i, '');
    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }
    seenSlugs.add(slug);
    validateFrontmatterForFile(path.join(dir, file));
  }
}

async function processDocx() {
  console.log('Processing System Design HLD.docx...');
  const docxPath = path.join(__dirname, '..', 'System Design HLD.docx');
  if (!fs.existsSync(docxPath)) {
    console.warn('HLD.docx not found');
    return;
  }

  const options = {
    convertImage: mammoth.images.imgElement((image) =>
      image.read('base64').then((imageBuffer) => {
        const ext = image.contentType.split('/')[1] || 'png';
        const uniqueName = `hld-img-${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;
        const imagePath = path.join(publicImagesDir, uniqueName);
        fs.writeFileSync(imagePath, Buffer.from(imageBuffer, 'base64'));
        return {
          src: `/images/${uniqueName}`,
        };
      })
    ),
  };

  const result = await mammoth.convertToHtml({ path: docxPath }, options);
  const html = result.value;

  const mdContent = `---
title: "System Design HLD"
type: docx
order: 1
---

<div className="docx-content">
${html}
</div>
`;

  const outputFile = 'system-design-hld.mdx';
  assertSafeFilename(outputFile);
  fs.writeFileSync(path.join(contentDir, outputFile), mdContent);
  console.log('HLD.docx processed');
}

function processPdf() {
  console.log('Processing system-design-roadmap.pdf...');
  const pdfPath = path.join(__dirname, '..', 'system-design-roadmap.pdf');
  if (!fs.existsSync(pdfPath)) return;

  fs.copyFileSync(pdfPath, path.join(publicPdfsDir, 'system-design-roadmap.pdf'));
  const mdContent = `---
title: "System Design Roadmap"
type: pdf
order: 1
---

<div className="w-full h-screen">
  <iframe src="/pdfs/system-design-roadmap.pdf" className="w-full h-full border-0" title="System Design Roadmap" />
</div>
`;

  const outputFile = 'system-design-roadmap.mdx';
  assertSafeFilename(outputFile);
  fs.writeFileSync(path.join(contentDir, outputFile), mdContent);
  console.log('PDF processed');
}

export function cleanLldContent(rawContent) {
  let content = rawContent.replace(/\\n/g, '\n');

  content = content.replace(/(Java|JavaScript|HTML|CSS|Python|SQL)\s*\n+```/gi, (_match, lang) => {
    return '```' + lang.toLowerCase() + '\n';
  });

  content = content.replace(/```(java|javascript|html|css|python|sql)?\n([\s\S]*?)```/gi, (_match, lang, code) => {
    const lines = code.split('\n');
    const cleanedLines = lines.map((line) => {
      const cleanMatch = line.match(/^\s*\d+(?!\.\d)\s*(.*)$/);
      return cleanMatch ? cleanMatch[1] : line;
    });
    return '```' + (lang || '') + '\n' + cleanedLines.join('\n') + '```';
  });

  return content;
}

function processLldNotes() {
  console.log('Processing Low_Level_Design_Notes.md...');
  const lldPath = path.join(__dirname, '..', 'Low_Level_Design_Notes.md');
  if (!fs.existsSync(lldPath)) return;

  const existingFiles = fs.readdirSync(contentDir);
  existingFiles.forEach((file) => {
    if (/^\d{3}-/.test(file)) {
      fs.unlinkSync(path.join(contentDir, file));
    }
  });

  const rawContent = fs.readFileSync(lldPath, 'utf8');
  const content = cleanLldContent(rawContent);

  const sections = content.split('## Source:');
  let index = 1;

  for (let section of sections) {
    section = section.trim();
    if (!section) continue;

    const lines = section.split('\n');
    const urlLine = lines[0].trim();
    let slug = `lld-lesson-${index}`;

    if (urlLine.startsWith('http')) {
      const parts = urlLine.split('/').filter(Boolean);
      slug = sanitizeSlug(parts[parts.length - 1]) || `lld-lesson-${index}`;
      lines.shift();
    }

    const remainingContent = lines.join('\n').trim();
    const titleMatch = remainingContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `LLD Lesson ${index}`;

    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
type: lld
order: ${index}
---

${remainingContent}
`;

    const outputFile = `${index.toString().padStart(3, '0')}-${slug}.md`;
    assertSafeFilename(outputFile);
    fs.writeFileSync(path.join(contentDir, outputFile), mdContent);
    index++;
  }

  console.log(`Processed ${index - 1} LLD lessons.`);
}

function processResources() {
  console.log('Processing system-design-resources...');
  const resDir = path.join(__dirname, '..', 'system-design-resources');
  if (!fs.existsSync(resDir)) return;

  ['README.md', 'top-20-questions.md'].forEach((file, idx) => {
    const fp = path.join(resDir, file);
    if (!fs.existsSync(fp)) return;

    const content = fs.readFileSync(fp, 'utf8');
    let title = file.replace('.md', '').replace(/-/g, ' ').toUpperCase();
    if (file === 'top-20-questions.md') title = 'Top 20 Questions';

    const mdContent = `---
title: "${title}"
type: resource
order: ${idx + 1}
---

${content}
`;
    const outputFile = `res-${file}`;
    assertSafeFilename(outputFile);
    fs.writeFileSync(path.join(contentDir, outputFile), mdContent);
  });

  console.log('Resources processed.');
}

export async function main() {
  ensureDirectories();
  await processDocx();
  processPdf();
  processLldNotes();
  processResources();
  validateGeneratedContent();
  console.log('All processing complete!');
}

const currentScriptUrl = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === currentScriptUrl) {
  main().catch((error) => {
    console.error('Content processing failed:', error);
    process.exitCode = 1;
  });
}