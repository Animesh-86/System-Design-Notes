import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'src', 'content');
const publicImagesDir = path.join(__dirname, 'public', 'images');
const publicPdfsDir = path.join(__dirname, 'public', 'pdfs');

[contentDir, publicImagesDir, publicPdfsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function processDocx() {
  console.log('Processing System Design HLD.docx...');
  const docxPath = path.join(__dirname, '..', 'System Design HLD.docx');
  if (!fs.existsSync(docxPath)) {
    console.error('HLD.docx not found');
    return;
  }

  const options = {
    convertImage: mammoth.images.imgElement(function (image) {
      return image.read('base64').then(function (imageBuffer) {
        const uniqueName = `hld_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${image.contentType.split('/')[1]}`;
        const imagePath = path.join(publicImagesDir, uniqueName);
        fs.writeFileSync(imagePath, Buffer.from(imageBuffer, 'base64'));
        return {
          src: `/images/${uniqueName}`,
        };
      });
    }),
  };

  try {
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
    fs.writeFileSync(path.join(contentDir, 'system-design-hld.mdx'), mdContent);
    console.log('HLD.docx processed');
  } catch (error) {
    console.error('Error processing docx:', error);
  }
}

function processPdf() {
  console.log('Processing system-design-roadmap.pdf...');
  const pdfPath = path.join(__dirname, '..', 'system-design-roadmap.pdf');
  if (fs.existsSync(pdfPath)) {
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
    fs.writeFileSync(path.join(contentDir, 'system-design-roadmap.mdx'), mdContent);
    console.log('PDF processed');
  }
}

function cleanLldContent(rawContent) {
  let content = rawContent.replace(/\\n/g, '\n');

  content = content.replace(/(Java|JavaScript|HTML|CSS|Python|SQL)\s*\n+```/gi, (match, lang) => {
    return '```' + lang.toLowerCase();
  });

  content = content.replace(/```(java|javascript|html|css|python|sql|)\n([\s\S]*?)```/g, (match, lang, code) => {
    const lines = code.split('\n');
    const cleanedLines = lines.map(line => {
      const cleanMatch = line.match(/^\s*\d+(?!\.\d)\s*(.*)$/);
      if (cleanMatch) {
        return cleanMatch[1];
      }
      return line;
    });
    return '```' + lang + '\n' + cleanedLines.join('\n') + '```';
  });

  return content;
}

function processLldNotes() {
  console.log('Processing Low_Level_Design_Notes.md...');
  const lldPath = path.join(__dirname, '..', 'Low_Level_Design_Notes.md');
  if (!fs.existsSync(lldPath)) return;

  const existingFiles = fs.readdirSync(contentDir);
  existingFiles.forEach((file) => {
    if (file.match(/^\d{3}-/)) {
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
      const parts = urlLine.split('/');
      slug = parts[parts.length - 1];
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
    fs.writeFileSync(path.join(contentDir, `${index.toString().padStart(3, '0')}-${slug}.md`), mdContent);
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
    if (fs.existsSync(fp)) {
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
      fs.writeFileSync(path.join(contentDir, `res-${file}`), mdContent);
    }
  });
  console.log('Resources processed.');
}

async function main() {
  await processDocx();
  processPdf();
  processLldNotes();
  processResources();
  console.log('All processing complete!');
}

main();