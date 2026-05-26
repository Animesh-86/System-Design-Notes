import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanLldContent, sanitizeSlug, validateGeneratedContent } from '../process_content.mjs';

const tempDirs: string[] = [];

function makeDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'next-docs-pipeline-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0, tempDirs.length)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('process content helpers', () => {
  it('normalizes malformed language fence header with newline', () => {
    const input = 'Java\n```\nSystem.out.println("x");\n```';
    const result = cleanLldContent(input);
    expect(result.includes('```java\n')).toBe(true);
  });

  it('sanitizes slug values safely', () => {
    expect(sanitizeSlug('My Lesson?ref=abc')).toBe('my-lesson');
    expect(sanitizeSlug('')).toBe('');
  });

  it('fails validation when duplicate slug exists', () => {
    const dir = makeDir();

    fs.writeFileSync(
      path.join(dir, 'same.md'),
      '---\ntitle: "A"\ntype: lld\norder: 1\n---\n\nA'
    );
    fs.writeFileSync(
      path.join(dir, 'same.mdx'),
      '---\ntitle: "B"\ntype: lld\norder: 2\n---\n\nB'
    );

    expect(() => validateGeneratedContent(dir)).toThrow(/Duplicate slug/);
  });
});
