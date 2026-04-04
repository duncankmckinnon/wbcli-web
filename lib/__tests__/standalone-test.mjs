/**
 * Standalone tests for MDX infrastructure — no external dependencies required.
 * Tests frontmatter parsing, file structure, content validation, and extractHeadings logic.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const DOCS_DIR = join(process.cwd(), 'content', 'docs');

// Minimal gray-matter-like frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  const data = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Parse numbers
    if (/^\d+$/.test(value)) value = parseInt(value, 10);
    // Strip quotes
    else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
      value = value.slice(1, -1);
    data[key] = value;
  }
  return { data, content: match[2] };
}

// Re-implementation of extractHeadings for testing
function extractHeadings(content) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

// ================= Tests =================

describe('MDX file existence and count', () => {
  it('content/docs/ directory exists', () => {
    const files = readdirSync(DOCS_DIR);
    assert.ok(files.length > 0);
  });

  it('exactly 6 .mdx files exist', () => {
    const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));
    assert.equal(files.length, 6);
  });

  it('all expected files exist', () => {
    const expected = [
      'getting-started.mdx',
      'plan-format.mdx',
      'cli-reference.mdx',
      'agents.mdx',
      'profiles.mdx',
      'tdd-mode.mdx',
    ];
    const files = readdirSync(DOCS_DIR);
    for (const f of expected) {
      assert.ok(files.includes(f), `Missing file: ${f}`);
    }
  });
});

describe('Frontmatter validation', () => {
  const expectedDocs = [
    { file: 'getting-started.mdx', title: 'Getting Started', order: 1 },
    { file: 'plan-format.mdx', title: 'Plan Format', order: 2 },
    { file: 'cli-reference.mdx', title: 'CLI Reference', order: 3 },
    { file: 'agents.mdx', title: 'Agents', order: 4 },
    { file: 'profiles.mdx', title: 'Profiles', order: 5 },
    { file: 'tdd-mode.mdx', title: 'TDD Mode', order: 6 },
  ];

  for (const doc of expectedDocs) {
    it(`${doc.file} has correct title "${doc.title}"`, () => {
      const raw = readFileSync(join(DOCS_DIR, doc.file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      assert.equal(data.title, doc.title);
    });

    it(`${doc.file} has correct order ${doc.order}`, () => {
      const raw = readFileSync(join(DOCS_DIR, doc.file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      assert.equal(data.order, doc.order);
    });

    it(`${doc.file} has a non-empty description`, () => {
      const raw = readFileSync(join(DOCS_DIR, doc.file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      assert.ok(typeof data.description === 'string' && data.description.length > 10);
    });
  }

  it('no duplicate order values', () => {
    const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));
    const orders = files.map(f => {
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      return parseFrontmatter(raw).data.order;
    });
    assert.equal(new Set(orders).size, orders.length);
  });
});

describe('getAllDocs logic simulation', () => {
  it('returns docs sorted by order', () => {
    const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));
    const docs = files.map(f => {
      const slug = f.replace(/\.mdx$/, '');
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      const { data } = parseFrontmatter(raw);
      return { slug, title: data.title, description: data.description, order: data.order };
    });
    docs.sort((a, b) => a.order - b.order);

    assert.deepEqual(
      docs.map(d => d.slug),
      ['getting-started', 'plan-format', 'cli-reference', 'agents', 'profiles', 'tdd-mode']
    );
  });
});

describe('getDocBySlug logic simulation', () => {
  it('returns parsed content without frontmatter', () => {
    const raw = readFileSync(join(DOCS_DIR, 'getting-started.mdx'), 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    assert.ok(!content.trimStart().startsWith('---'), 'Content should not start with frontmatter');
    assert.ok(content.includes('## Prerequisites'));
    assert.equal(data.title, 'Getting Started');
  });

  it('throws for non-existent slug', () => {
    assert.throws(() => {
      readFileSync(join(DOCS_DIR, 'nonexistent.mdx'), 'utf-8');
    });
  });
});

describe('getDocSlugs logic simulation', () => {
  it('returns 6 slugs', () => {
    const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));
    const slugs = files.map(f => f.replace(/\.mdx$/, ''));
    assert.equal(slugs.length, 6);
  });

  it('all slugs are kebab-case', () => {
    const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));
    for (const f of files) {
      const slug = f.replace(/\.mdx$/, '');
      assert.ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug), `Slug "${slug}" should be kebab-case`);
    }
  });
});

describe('extractHeadings unit tests', () => {
  it('extracts ## headings', () => {
    const h = extractHeadings('## Hello World\n\nSome text');
    assert.equal(h.length, 1);
    assert.equal(h[0].text, 'Hello World');
    assert.equal(h[0].level, 2);
    assert.equal(h[0].id, 'hello-world');
  });

  it('extracts ### headings', () => {
    const h = extractHeadings('### Sub Heading');
    assert.equal(h.length, 1);
    assert.equal(h[0].level, 3);
    assert.equal(h[0].id, 'sub-heading');
  });

  it('does not extract # (h1) headings', () => {
    const h = extractHeadings('# Top Level\n\n## Second Level');
    assert.equal(h.length, 1);
    assert.equal(h[0].text, 'Second Level');
  });

  it('does not extract #### or deeper', () => {
    const h = extractHeadings('#### Deep\n\n## Normal');
    assert.equal(h.length, 1);
    assert.equal(h[0].text, 'Normal');
  });

  it('extracts multiple headings in order', () => {
    const h = extractHeadings('## A\ntext\n## B\ntext\n### C');
    assert.equal(h.length, 3);
    assert.deepEqual(h.map(x => x.text), ['A', 'B', 'C']);
  });

  it('generates correct slug ids', () => {
    const h = extractHeadings('## My API Reference');
    assert.equal(h[0].id, 'my-api-reference');
  });

  it('strips non-alphanumeric from ids', () => {
    const h = extractHeadings('## What Are Profiles?\n## Step 1: Install');
    assert.equal(h[0].id, 'what-are-profiles');
    assert.equal(h[1].id, 'step-1-install');
  });

  it('returns empty array for no headings', () => {
    assert.equal(extractHeadings('Just text').length, 0);
  });

  it('returns empty array for empty string', () => {
    assert.equal(extractHeadings('').length, 0);
  });
});

describe('extractHeadings on actual MDX content', () => {
  const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));

  for (const f of files) {
    it(`${f} has at least one heading`, () => {
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      const { content } = parseFrontmatter(raw);
      const headings = extractHeadings(content);
      assert.ok(headings.length > 0, `${f} should have at least one heading`);
    });

    it(`${f} headings have valid ids`, () => {
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      const { content } = parseFrontmatter(raw);
      const headings = extractHeadings(content);
      for (const h of headings) {
        assert.ok(h.id.length > 0, `Empty id for heading "${h.text}"`);
        assert.ok(/^[a-z0-9-]+$/.test(h.id), `Invalid id "${h.id}" for "${h.text}"`);
      }
    });
  }

  it('getting-started has expected section headings', () => {
    const raw = readFileSync(join(DOCS_DIR, 'getting-started.mdx'), 'utf-8');
    const { content } = parseFrontmatter(raw);
    const headings = extractHeadings(content);
    const texts = headings.map(h => h.text);
    assert.ok(texts.includes('Prerequisites'));
    assert.ok(texts.includes('Installation'));
    assert.ok(texts.includes('Project Setup'));
  });
});

describe('getting-started.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'getting-started.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('has Prerequisites section with Python 3.11+', () => {
    assert.ok(content.includes('Python 3.11'));
    assert.ok(content.includes('python3 --version'));
  });

  it('has Installation with pip install wbcli', () => {
    assert.ok(content.includes('pip install wbcli'));
  });

  it('mentions wb command', () => {
    assert.ok(content.includes('`wb`') || content.includes('wb '));
  });

  it('has Project Setup with wb setup', () => {
    assert.ok(content.includes('wb setup'));
    assert.ok(content.includes('.workbench/'));
  });

  it('has a complete example plan', () => {
    assert.ok(content.includes('## Context'));
    assert.ok(content.includes('## Conventions'));
    assert.ok(content.includes('## Task:'));
  });

  it('has Running the Plan with wb run', () => {
    assert.ok(content.includes('wb run plan.md'));
  });

  it('mentions wb preview for dry-run', () => {
    assert.ok(content.includes('wb preview'));
  });

  it('links to other docs', () => {
    assert.ok(content.includes('/docs/plan-format'));
    assert.ok(content.includes('/docs/cli-reference'));
    assert.ok(content.includes('/docs/agents'));
  });

  it('has code blocks', () => {
    assert.ok(content.includes('```'));
  });

  it('is substantial (>1000 chars)', () => {
    assert.ok(content.trim().length > 1000);
  });
});

describe('plan-format.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'plan-format.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('has Overview section', () => assert.ok(content.includes('## Overview')));
  it('has Plan Structure section', () => assert.ok(content.includes('## Plan Structure')));
  it('explains Files metadata', () => assert.ok(content.includes('Files:')));
  it('explains Depends metadata', () => assert.ok(content.includes('Depends:')));
  it('mentions Scope alias', () => assert.ok(content.includes('Scope:')));
  it('mentions After/Dependencies aliases', () => {
    assert.ok(content.includes('After:') || content.includes('Dependencies:'));
  });
  it('has Dependency Slugs section', () => assert.ok(content.includes('Dependency Slugs') || content.includes('slug')));
  it('has slug examples table', () => assert.ok(content.includes('user-model')));
  it('has Waves section', () => assert.ok(content.includes('## Waves')));
  it('explains wave assignment', () => {
    assert.ok(content.includes('Wave 1'));
    assert.ok(content.includes('Wave 2'));
  });
  it('has Writing Good Tasks section', () => assert.ok(content.includes('Writing Good Tasks')));
  it('has bad vs good example', () => {
    assert.ok(content.includes('Bad') || content.includes('bad'));
    assert.ok(content.includes('Good') || content.includes('good'));
  });
  it('has Avoiding Merge Conflicts section', () => {
    assert.ok(content.includes('Merge Conflict') || content.includes('merge conflict'));
  });
});

describe('cli-reference.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'cli-reference.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('documents wb run', () => assert.ok(content.includes('## wb run')));
  it('documents wb preview', () => assert.ok(content.includes('## wb preview')));
  it('documents wb status', () => assert.ok(content.includes('## wb status')));
  it('documents wb stop', () => assert.ok(content.includes('## wb stop')));
  it('documents wb clean', () => assert.ok(content.includes('## wb clean')));
  it('documents wb setup', () => assert.ok(content.includes('## wb setup')));
  it('documents wb init', () => assert.ok(content.includes('wb init')));
  it('documents wb profile subcommands', () => {
    assert.ok(content.includes('wb profile init'));
    assert.ok(content.includes('wb profile set'));
    assert.ok(content.includes('wb profile show'));
    assert.ok(content.includes('wb profile diff'));
  });

  // All flags
  it('documents --tdd flag', () => assert.ok(content.includes('--tdd')));
  it('documents --skip-test', () => assert.ok(content.includes('--skip-test')));
  it('documents --skip-review', () => assert.ok(content.includes('--skip-review')));
  it('documents --base', () => assert.ok(content.includes('--base')));
  it('documents --local', () => assert.ok(content.includes('--local')));
  it('documents --session-branch', () => assert.ok(content.includes('--session-branch')));
  it('documents --start-wave', () => assert.ok(content.includes('--start-wave')));
  it('documents --max-retries', () => assert.ok(content.includes('--max-retries')));
  it('documents --reviewer-directive', () => assert.ok(content.includes('--reviewer-directive')));
  it('documents --tester-directive', () => assert.ok(content.includes('--tester-directive')));
  it('documents --cleanup for wb stop', () => assert.ok(content.includes('--cleanup')));
});

describe('agents.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'agents.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('lists Claude Code', () => assert.ok(content.includes('Claude Code')));
  it('lists Gemini CLI', () => assert.ok(content.includes('Gemini CLI')));
  it('lists OpenAI Codex', () => assert.ok(content.includes('Codex')));
  it('mentions agents.yaml', () => assert.ok(content.includes('agents.yaml')));
  it('has multi-provider YAML example', () => {
    assert.ok(content.includes('implementor:'));
    assert.ok(content.includes('tester:'));
    assert.ok(content.includes('reviewer:'));
  });
  it('explains custom agents', () => assert.ok(content.includes('Custom Agent')));
  it('explains directive overrides', () => {
    assert.ok(content.includes('--reviewer-directive'));
    assert.ok(content.includes('--tester-directive'));
  });
  it('explains all 5 roles', () => {
    assert.ok(content.includes('Implementor'));
    assert.ok(content.includes('Tester'));
    assert.ok(content.includes('Reviewer'));
    assert.ok(content.includes('Fixer'));
    assert.ok(content.includes('Merger'));
  });
});

describe('profiles.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'profiles.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('explains what profiles are', () => assert.ok(content.includes('What Are Profiles')));
  it('shows wb profile init', () => assert.ok(content.includes('wb profile init')));
  it('shows wb profile set', () => assert.ok(content.includes('wb profile set')));
  it('shows wb profile show', () => assert.ok(content.includes('wb profile show')));
  it('shows wb profile diff', () => assert.ok(content.includes('wb profile diff')));
  it('references profile.yaml', () => assert.ok(content.includes('profile.yaml')));
  it('shows default profile contents', () => {
    assert.ok(content.includes('agent: claude'));
  });
  it('explains when to use profiles', () => {
    assert.ok(content.includes('When to Use'));
  });
});

describe('tdd-mode.mdx content', () => {
  const raw = readFileSync(join(DOCS_DIR, 'tdd-mode.mdx'), 'utf-8');
  const { content } = parseFrontmatter(raw);

  it('has Overview', () => assert.ok(content.includes('## Overview')));
  it('has Usage', () => assert.ok(content.includes('## Usage')));
  it('has How It Works', () => assert.ok(content.includes('## How It Works')));
  it('shows --tdd flag', () => assert.ok(content.includes('--tdd')));
  it('explains inverted pipeline', () => {
    assert.ok(content.includes('test →') || content.includes('test →'));
  });
  it('has 5 pipeline steps', () => {
    assert.ok(content.includes('Step 1'));
    assert.ok(content.includes('Step 2'));
    assert.ok(content.includes('Step 3'));
    assert.ok(content.includes('Step 4'));
    assert.ok(content.includes('Step 5'));
  });
  it('has Writing Plans for TDD section', () => {
    assert.ok(content.includes('Writing Plans for TDD'));
  });
  it('has behavior-focused example', () => {
    assert.ok(content.includes('behavior') || content.includes('Expected behavior'));
  });
  it('explains when to use TDD', () => {
    assert.ok(content.includes('When to Use TDD'));
    assert.ok(content.includes('Good fit'));
    assert.ok(content.includes('Less useful'));
  });
});

describe('lib/docs.ts source code validation', () => {
  const src = readFileSync(join(process.cwd(), 'lib', 'docs.ts'), 'utf-8');

  it('exports DocMeta interface', () => {
    assert.ok(src.includes('export interface DocMeta'));
  });

  it('DocMeta has required fields', () => {
    assert.ok(src.includes('slug: string'));
    assert.ok(src.includes('title: string'));
    assert.ok(src.includes('description: string'));
    assert.ok(src.includes('order: number'));
  });

  it('exports getAllDocs function', () => {
    assert.ok(src.includes('export function getAllDocs'));
  });

  it('exports getDocBySlug function', () => {
    assert.ok(src.includes('export function getDocBySlug'));
  });

  it('exports getDocSlugs function', () => {
    assert.ok(src.includes('export function getDocSlugs'));
  });

  it('uses gray-matter for frontmatter parsing', () => {
    assert.ok(src.includes("import matter from 'gray-matter'"));
  });

  it('reads from content/docs directory', () => {
    assert.ok(src.includes("'content'"));
    assert.ok(src.includes("'docs'"));
  });

  it('sorts by order', () => {
    assert.ok(src.includes('a.order - b.order'));
  });

  it('filters for .mdx files', () => {
    assert.ok(src.includes(".endsWith('.mdx')"));
  });

  it('getDocBySlug returns meta and content', () => {
    assert.ok(src.includes('meta:'));
    assert.ok(src.includes('content'));
  });
});

describe('lib/mdx.ts source code validation', () => {
  const src = readFileSync(join(process.cwd(), 'lib', 'mdx.ts'), 'utf-8');

  it('imports MDXRemote from next-mdx-remote/rsc', () => {
    assert.ok(src.includes("from 'next-mdx-remote/rsc'"));
  });

  it('imports rehype-pretty-code', () => {
    assert.ok(src.includes("from 'rehype-pretty-code'"));
  });

  it('exports MDXContent component', () => {
    assert.ok(src.includes('export function MDXContent'));
  });

  it('MDXContent uses MDXRemote with source prop', () => {
    assert.ok(src.includes('MDXRemote'));
    assert.ok(src.includes('source'));
  });

  it('configures rehypePrettyCode with github-dark theme', () => {
    assert.ok(src.includes("theme: 'github-dark'"));
  });

  it('MDXContent accepts components prop', () => {
    assert.ok(src.includes('components'));
  });

  it('exports extractHeadings function', () => {
    assert.ok(src.includes('export function extractHeadings'));
  });

  it('extractHeadings uses correct regex for ## and ###', () => {
    assert.ok(src.includes('/^(#{2,3})\\s+(.+)$/gm'));
  });

  it('extractHeadings returns Heading array with id, text, level', () => {
    assert.ok(src.includes('id:'));
    assert.ok(src.includes('text,') || src.includes('text:'));
    assert.ok(src.includes('level:'));
  });

  it('does NOT use serialize from next-mdx-remote', () => {
    assert.ok(!src.includes('serialize'));
    assert.ok(!src.includes('MDXRemoteSerializeResult'));
  });
});

describe('Content quality checks', () => {
  const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.mdx'));

  for (const f of files) {
    it(`${f} has substantial content (>500 chars)`, () => {
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      const { content } = parseFrontmatter(raw);
      assert.ok(content.trim().length > 500, `${f}: only ${content.trim().length} chars`);
    });

    it(`${f} has code examples`, () => {
      const raw = readFileSync(join(DOCS_DIR, f), 'utf-8');
      assert.ok(raw.includes('```'), `${f} should have code blocks`);
    });
  }
});
