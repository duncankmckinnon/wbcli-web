import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getAllDocs, getDocBySlug } from '../docs';

describe('plan-frontmatter.mdx', () => {
  describe('frontmatter', () => {
    it('has correct title', () => {
      const { meta } = getDocBySlug('plan-frontmatter');
      assert.equal(meta.title, 'Plan Frontmatter');
    });

    it('has a non-empty description', () => {
      const { meta } = getDocBySlug('plan-frontmatter');
      assert.ok(meta.description.length > 0);
      assert.match(meta.description, /frontmatter/i);
    });

    it('is nested under plan-format', () => {
      const { meta } = getDocBySlug('plan-frontmatter');
      assert.equal(meta.parent, 'plan-format');
    });

    it('has order 1 (so it sorts before Running Plans at order 3)', () => {
      const { meta } = getDocBySlug('plan-frontmatter');
      assert.equal(meta.order, 1);
    });
  });

  describe('sidebar placement', () => {
    it('is loaded by getAllDocs()', () => {
      const slugs = getAllDocs().map((d) => d.slug);
      assert.ok(slugs.includes('plan-frontmatter'), 'plan-frontmatter should appear in docs index');
    });

    it('sorts before running-plans among children of plan-format', () => {
      const docs = getAllDocs();
      const children = docs.filter((d) => d.parent === 'plan-format');
      const slugs = children.map((c) => c.slug);
      const fmIdx = slugs.indexOf('plan-frontmatter');
      const rpIdx = slugs.indexOf('running-plans');
      assert.ok(fmIdx >= 0, 'plan-frontmatter should be a child of plan-format');
      assert.ok(rpIdx >= 0, 'running-plans should be a child of plan-format');
      assert.ok(fmIdx < rpIdx, 'plan-frontmatter should appear before running-plans');
    });

    it('parent slug refers to an existing page', () => {
      const { meta } = getDocBySlug('plan-frontmatter');
      assert.doesNotThrow(() => getDocBySlug(meta.parent!));
    });
  });

  describe('required sections', () => {
    it('has a Fields section', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /^##\s+Fields\b/m);
    });

    it('has a Precedence section', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /^##\s+Precedence\b/m);
    });

    it('has an Example section', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /^##\s+Example\b/m);
    });

    it('does not include a body H1 outside code blocks (title comes from frontmatter)', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      // Strip fenced code blocks (both ``` and ```` fences) before checking.
      const stripped = content
        .replace(/^````[\s\S]*?^````/gm, '')
        .replace(/^```[\s\S]*?^```/gm, '');
      assert.doesNotMatch(stripped, /^#\s+[^#]/m);
    });
  });

  describe('precedence rule', () => {
    it('states CLI flags > frontmatter > built-in defaults', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      // Allow for bold markers / spacing variations.
      const normalized = content.replace(/\*\*/g, '').replace(/\s+/g, ' ');
      assert.match(
        normalized,
        /CLI flags > frontmatter > built-in defaults/,
        'precedence should be documented in CLI > frontmatter > defaults order'
      );
    });
  });

  describe('fields table', () => {
    const requiredRows: Array<[string, string]> = [
      ['session_branch', '--session-branch'],
      ['name', '--name'],
      ['base', '--base'],
      ['local', '--local'],
      ['agent', '--agent'],
      ['profile', '--profile'],
      ['profile_name', '--profile-name'],
      ['max_concurrent', '--max-concurrent'],
      ['max_retries', '--max-retries'],
      ['tdd', '--tdd'],
      ['skip_test', '--skip-test'],
      ['skip_review', '--skip-review'],
      ['retry_failed', '--retry-failed'],
      ['fail_fast', '--fail-fast'],
      ['cleanup', '--cleanup'],
      ['keep_branches', '--keep-branches'],
      ['push', '--push'],
      ['final_review', '--final-review'],
    ];

    for (const [key, flag] of requiredRows) {
      it(`mentions ${key} alongside ${flag}`, () => {
        const { content } = getDocBySlug('plan-frontmatter');
        assert.ok(content.includes(key), `should mention key \`${key}\``);
        assert.ok(content.includes(flag), `should mention flag \`${flag}\``);
      });
    }

    it('includes a markdown table header', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /\|\s*Key\s*\|\s*Type\s*\|\s*CLI equivalent\s*\|/);
    });

    it('mentions short flag aliases -b and -j', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.ok(content.includes('-b'), 'should mention short flag -b');
      assert.ok(content.includes('-j'), 'should mention short flag -j');
    });
  });

  describe('example block', () => {
    it('uses a four-backtick outer fence so an inner ``` fence renders', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /^````markdown\b/m, 'should open with ````markdown');
      // Should also close with four backticks (not three followed by an unrelated three).
      const fourTickFences = content.match(/^````/gm) || [];
      assert.ok(fourTickFences.length >= 2, 'should have opening and closing four-backtick fences');
    });

    it('contains the documented example frontmatter values', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.ok(content.includes('session_branch: workbench-auth'));
      assert.ok(content.includes('base: feature-auth'));
      assert.ok(content.includes('tdd: true'));
      assert.ok(content.includes('max_concurrent: 6'));
      assert.ok(content.includes('final_review: true'));
    });

    it('shows the example title line below the frontmatter', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.ok(content.includes('# Auth refactor'));
    });
  });

  describe('cross-links', () => {
    it('links to Plans', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /\(\/docs\/plan-format(?:#[^)]*)?\)/);
    });

    it('links to CLI Reference', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /\(\/docs\/cli-reference(?:#[^)]*)?\)/);
    });

    it('links to Review & Pull Requests', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.match(content, /\(\/docs\/review-pr-flow(?:#[^)]*)?\)/);
    });
  });

  describe('general quality', () => {
    it('has substantial content (>500 chars)', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.ok(content.trim().length > 500);
    });

    it('contains at least one code block', () => {
      const { content } = getDocBySlug('plan-frontmatter');
      assert.ok(content.includes('```'));
    });
  });
});
