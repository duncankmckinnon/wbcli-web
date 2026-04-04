import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getAllDocs, getDocBySlug, getDocSlugs, type DocMeta } from '../docs';

describe('getAllDocs', () => {
  it('returns exactly 6 docs', () => {
    const docs = getAllDocs();
    assert.equal(docs.length, 6);
  });

  it('returns docs sorted by order', () => {
    const docs = getAllDocs();
    for (let i = 1; i < docs.length; i++) {
      assert.ok(
        docs[i].order > docs[i - 1].order,
        `Doc at index ${i} (order ${docs[i].order}) should be after doc at index ${i - 1} (order ${docs[i - 1].order})`
      );
    }
  });

  it('returns correct order values 1 through 6', () => {
    const docs = getAllDocs();
    const orders = docs.map((d) => d.order);
    assert.deepEqual(orders, [1, 2, 3, 4, 5, 6]);
  });

  it('returns the expected slugs in order', () => {
    const docs = getAllDocs();
    const slugs = docs.map((d) => d.slug);
    assert.deepEqual(slugs, [
      'getting-started',
      'plan-format',
      'cli-reference',
      'agents',
      'profiles',
      'tdd-mode',
    ]);
  });

  it('returns the expected titles in order', () => {
    const docs = getAllDocs();
    const titles = docs.map((d) => d.title);
    assert.deepEqual(titles, [
      'Getting Started',
      'Plan Format',
      'CLI Reference',
      'Agents',
      'Profiles',
      'TDD Mode',
    ]);
  });

  it('every doc has a non-empty description', () => {
    const docs = getAllDocs();
    for (const doc of docs) {
      assert.ok(doc.description, `Doc "${doc.slug}" should have a description`);
      assert.ok(doc.description.length > 10, `Doc "${doc.slug}" description should be meaningful`);
    }
  });

  it('every doc has all required DocMeta fields', () => {
    const docs = getAllDocs();
    for (const doc of docs) {
      assert.ok(typeof doc.slug === 'string', `slug should be string for ${doc.slug}`);
      assert.ok(typeof doc.title === 'string', `title should be string for ${doc.slug}`);
      assert.ok(typeof doc.description === 'string', `description should be string for ${doc.slug}`);
      assert.ok(typeof doc.order === 'number', `order should be number for ${doc.slug}`);
    }
  });
});

describe('getDocBySlug', () => {
  const expectedSlugs = [
    'getting-started',
    'plan-format',
    'cli-reference',
    'agents',
    'profiles',
    'tdd-mode',
  ];

  for (const slug of expectedSlugs) {
    it(`returns valid data for "${slug}"`, () => {
      const result = getDocBySlug(slug);
      assert.ok(result.meta, `Should have meta for ${slug}`);
      assert.ok(result.content, `Should have content for ${slug}`);
      assert.equal(result.meta.slug, slug);
      assert.ok(result.meta.title.length > 0);
      assert.ok(result.meta.description.length > 0);
      assert.ok(typeof result.meta.order === 'number');
    });

    it(`returns non-empty MDX content for "${slug}"`, () => {
      const result = getDocBySlug(slug);
      // Content should be substantial (not just whitespace)
      assert.ok(result.content.trim().length > 100, `Content for ${slug} should be substantial`);
    });
  }

  it('throws for a non-existent slug', () => {
    assert.throws(() => {
      getDocBySlug('non-existent-slug');
    });
  });

  it('content does not include frontmatter', () => {
    const result = getDocBySlug('getting-started');
    assert.ok(!result.content.startsWith('---'), 'Content should not start with frontmatter delimiter');
  });

  it('meta matches between getAllDocs and getDocBySlug', () => {
    const allDocs = getAllDocs();
    for (const doc of allDocs) {
      const single = getDocBySlug(doc.slug);
      assert.equal(single.meta.title, doc.title);
      assert.equal(single.meta.description, doc.description);
      assert.equal(single.meta.order, doc.order);
      assert.equal(single.meta.slug, doc.slug);
    }
  });
});

describe('getDocSlugs', () => {
  it('returns exactly 6 slugs', () => {
    const slugs = getDocSlugs();
    assert.equal(slugs.length, 6);
  });

  it('contains all expected slugs', () => {
    const slugs = getDocSlugs();
    const expected = [
      'getting-started',
      'plan-format',
      'cli-reference',
      'agents',
      'profiles',
      'tdd-mode',
    ];
    for (const slug of expected) {
      assert.ok(slugs.includes(slug), `Should contain slug "${slug}"`);
    }
  });

  it('matches slugs from getAllDocs', () => {
    const slugsFromGetAll = getAllDocs().map((d) => d.slug);
    const slugs = getDocSlugs();
    // Same set of slugs (order may differ since getDocSlugs doesn't sort)
    assert.deepEqual([...slugs].sort(), [...slugsFromGetAll].sort());
  });
});
