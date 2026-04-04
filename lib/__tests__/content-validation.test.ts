import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDocBySlug, getAllDocs } from '../docs';

describe('MDX content validation', () => {
  describe('getting-started.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('getting-started');
      assert.equal(meta.title, 'Getting Started');
      assert.equal(meta.order, 1);
      assert.ok(meta.description.length > 0);
    });

    it('contains required sections', () => {
      const { content } = getDocBySlug('getting-started');
      assert.ok(content.includes('## Prerequisites'), 'Should have Prerequisites section');
      assert.ok(content.includes('## Installation'), 'Should have Installation section');
      assert.ok(content.includes('## Project Setup'), 'Should have Project Setup section');
      assert.ok(content.includes('pip install wbcli'), 'Should mention pip install');
      assert.ok(content.includes('wb setup'), 'Should mention wb setup');
      assert.ok(content.includes('wb run'), 'Should mention wb run');
      assert.ok(content.includes('wb preview'), 'Should mention wb preview');
      assert.ok(content.includes('Python 3.11'), 'Should mention Python 3.11+');
    });

    it('has code examples', () => {
      const { content } = getDocBySlug('getting-started');
      assert.ok(content.includes('```'), 'Should contain code blocks');
    });

    it('links to other doc pages', () => {
      const { content } = getDocBySlug('getting-started');
      assert.ok(content.includes('/docs/plan-format') || content.includes('plan-format'), 'Should link to plan-format');
      assert.ok(content.includes('/docs/cli-reference') || content.includes('cli-reference'), 'Should link to cli-reference');
      assert.ok(content.includes('/docs/agents') || content.includes('agents'), 'Should link to agents');
    });
  });

  describe('plan-format.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('plan-format');
      assert.equal(meta.title, 'Plan Format');
      assert.equal(meta.order, 2);
    });

    it('contains required sections', () => {
      const { content } = getDocBySlug('plan-format');
      assert.ok(content.includes('## Overview'), 'Should have Overview section');
      assert.ok(content.includes('## Plan Structure') || content.includes('## Task Metadata'), 'Should describe plan structure');
      assert.ok(content.includes('Depends:') || content.includes('Dependencies'), 'Should explain dependencies');
      assert.ok(content.includes('## Waves') || content.includes('Wave'), 'Should explain waves');
      assert.ok(content.includes('Files:'), 'Should explain Files metadata');
    });

    it('explains dependency slugs', () => {
      const { content } = getDocBySlug('plan-format');
      assert.ok(content.includes('slug'), 'Should explain slug conversion');
    });

    it('has merge conflict avoidance section', () => {
      const { content } = getDocBySlug('plan-format');
      assert.ok(
        content.includes('Merge Conflict') || content.includes('merge conflict'),
        'Should have merge conflict section'
      );
    });
  });

  describe('cli-reference.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('cli-reference');
      assert.equal(meta.title, 'CLI Reference');
      assert.equal(meta.order, 3);
    });

    it('documents all required commands', () => {
      const { content } = getDocBySlug('cli-reference');
      assert.ok(content.includes('## wb run'), 'Should document wb run');
      assert.ok(content.includes('## wb preview'), 'Should document wb preview');
      assert.ok(content.includes('## wb status'), 'Should document wb status');
      assert.ok(content.includes('## wb stop'), 'Should document wb stop');
      assert.ok(content.includes('## wb clean'), 'Should document wb clean');
      assert.ok(content.includes('## wb setup'), 'Should document wb setup');
      assert.ok(content.includes('## wb init') || content.includes('wb init'), 'Should document wb init');
      assert.ok(content.includes('wb profile'), 'Should document wb profile');
    });

    it('documents required flags for wb run', () => {
      const { content } = getDocBySlug('cli-reference');
      assert.ok(content.includes('--tdd'), 'Should document --tdd flag');
      assert.ok(content.includes('--skip-test'), 'Should document --skip-test flag');
      assert.ok(content.includes('--skip-review'), 'Should document --skip-review flag');
      assert.ok(content.includes('--base'), 'Should document --base flag');
      assert.ok(content.includes('--local'), 'Should document --local flag');
      assert.ok(content.includes('--session-branch'), 'Should document --session-branch flag');
      assert.ok(content.includes('--start-wave'), 'Should document --start-wave flag');
      assert.ok(content.includes('--max-retries'), 'Should document --max-retries flag');
      assert.ok(content.includes('--reviewer-directive'), 'Should document --reviewer-directive flag');
      assert.ok(content.includes('--tester-directive'), 'Should document --tester-directive flag');
    });
  });

  describe('agents.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('agents');
      assert.equal(meta.title, 'Agents');
      assert.equal(meta.order, 4);
    });

    it('contains required sections', () => {
      const { content } = getDocBySlug('agents');
      assert.ok(content.includes('Supported Agents') || content.includes('supported agent'), 'Should list supported agents');
      assert.ok(content.includes('Claude Code') || content.includes('claude'), 'Should mention Claude Code');
      assert.ok(content.includes('Gemini CLI') || content.includes('gemini'), 'Should mention Gemini CLI');
      assert.ok(content.includes('Codex') || content.includes('codex'), 'Should mention OpenAI Codex');
      assert.ok(content.includes('agents.yaml'), 'Should reference agents.yaml');
      assert.ok(content.includes('Custom Agent') || content.includes('custom agent'), 'Should explain custom agents');
      assert.ok(content.includes('Directive') || content.includes('directive'), 'Should explain directive overrides');
    });

    it('explains agent roles', () => {
      const { content } = getDocBySlug('agents');
      assert.ok(content.includes('Implementor') || content.includes('implementor'), 'Should explain Implementor role');
      assert.ok(content.includes('Tester') || content.includes('tester'), 'Should explain Tester role');
      assert.ok(content.includes('Reviewer') || content.includes('reviewer'), 'Should explain Reviewer role');
      assert.ok(content.includes('Fixer') || content.includes('fixer'), 'Should explain Fixer role');
      assert.ok(content.includes('Merger') || content.includes('merger'), 'Should explain Merger role');
    });
  });

  describe('profiles.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('profiles');
      assert.equal(meta.title, 'Profiles');
      assert.equal(meta.order, 5);
    });

    it('contains required sections', () => {
      const { content } = getDocBySlug('profiles');
      assert.ok(content.includes('What Are Profiles') || content.includes('what are profiles'), 'Should explain what profiles are');
      assert.ok(content.includes('wb profile init'), 'Should document profile init');
      assert.ok(content.includes('wb profile set'), 'Should document profile set');
      assert.ok(content.includes('wb profile show'), 'Should document profile show');
      assert.ok(content.includes('wb profile diff'), 'Should document profile diff');
      assert.ok(content.includes('profile.yaml'), 'Should reference profile.yaml');
    });
  });

  describe('tdd-mode.mdx', () => {
    it('has correct frontmatter', () => {
      const { meta } = getDocBySlug('tdd-mode');
      assert.equal(meta.title, 'TDD Mode');
      assert.equal(meta.order, 6);
    });

    it('contains required sections', () => {
      const { content } = getDocBySlug('tdd-mode');
      assert.ok(content.includes('## Overview'), 'Should have Overview section');
      assert.ok(content.includes('## Usage'), 'Should have Usage section');
      assert.ok(content.includes('## How It Works'), 'Should explain how it works');
      assert.ok(content.includes('--tdd'), 'Should show --tdd flag');
      assert.ok(content.includes('test → implement') || content.includes('test →'), 'Should explain inverted pipeline');
    });

    it('explains when to use and not use TDD', () => {
      const { content } = getDocBySlug('tdd-mode');
      assert.ok(content.includes('When to Use') || content.includes('when to use'), 'Should explain when to use TDD');
    });
  });

  describe('all docs general quality', () => {
    it('all docs have substantial content (>500 chars)', () => {
      const docs = getAllDocs();
      for (const doc of docs) {
        const { content } = getDocBySlug(doc.slug);
        assert.ok(
          content.trim().length > 500,
          `Doc "${doc.slug}" has only ${content.trim().length} chars, expected > 500`
        );
      }
    });

    it('all docs have code examples', () => {
      const docs = getAllDocs();
      for (const doc of docs) {
        const { content } = getDocBySlug(doc.slug);
        assert.ok(
          content.includes('```'),
          `Doc "${doc.slug}" should contain at least one code block`
        );
      }
    });

    it('no doc has duplicate order values', () => {
      const docs = getAllDocs();
      const orders = docs.map((d) => d.order);
      const uniqueOrders = new Set(orders);
      assert.equal(uniqueOrders.size, orders.length, 'All order values should be unique');
    });
  });
});
