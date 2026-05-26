import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { getAllContent, getContentBySlug } from '@/lib/content';

const tempDirs: string[] = [];

function createTempContentDir() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'next-docs-content-'));
  tempDirs.push(tempRoot);
  return tempRoot;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0, tempDirs.length)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('content loader', () => {
  it('loads only md/mdx files and sorts by type and order', () => {
    const dir = createTempContentDir();

    fs.writeFileSync(
      path.join(dir, '001-first.md'),
      '---\ntitle: "First"\ntype: lld\norder: 2\n---\n\nHello'
    );
    fs.writeFileSync(
      path.join(dir, '002-second.mdx'),
      '---\ntitle: "Second"\ntype: lld\norder: 1\n---\n\nWorld'
    );
    fs.writeFileSync(path.join(dir, 'ignored.txt'), 'nope');

    const items = getAllContent(dir);
    expect(items).toHaveLength(2);
    expect(items[0].slug).toBe('002-second');
    expect(items[1].slug).toBe('001-first');
  });

  it('resolves content by slug from custom directory', () => {
    const dir = createTempContentDir();
    fs.writeFileSync(
      path.join(dir, 'lesson-a.md'),
      '---\ntitle: "Lesson A"\ntype: resource\norder: 1\n---\n\nA'
    );

    const item = getContentBySlug('lesson-a', dir);
    expect(item?.title).toBe('Lesson A');
  });
});
