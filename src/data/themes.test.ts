import { describe, it, expect } from 'vitest';
import { themes, defaultTheme } from './themes';

describe('themes', () => {
  it('exports an array of 4 themes', () => {
    expect(themes).toHaveLength(4);
  });

  it('contains the expected theme IDs in order', () => {
    expect(themes.map((t) => t.id)).toEqual(['icebreaker', 'tech', 'office', 'adventure']);
  });

  it('each theme has a non-empty name', () => {
    themes.forEach((theme) => {
      expect(theme.name).toBeTruthy();
    });
  });

  it('each theme has a non-empty emoji', () => {
    themes.forEach((theme) => {
      expect(theme.emoji).toBeTruthy();
    });
  });

  describe('question lists', () => {
    it('each theme has exactly 24 questions (enough to fill a 5×5 board minus the free space)', () => {
      themes.forEach((theme) => {
        expect(theme.questions).toHaveLength(24);
      });
    });

    it('each theme has no duplicate questions', () => {
      themes.forEach((theme) => {
        const unique = new Set(theme.questions);
        expect(unique.size).toBe(theme.questions.length);
      });
    });

    it('each question is a non-empty string', () => {
      themes.forEach((theme) => {
        theme.questions.forEach((q) => {
          expect(typeof q).toBe('string');
          expect(q.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('defaultTheme', () => {
    it('is the first theme in the array', () => {
      expect(defaultTheme).toBe(themes[0]);
    });

    it('has the id "icebreaker"', () => {
      expect(defaultTheme.id).toBe('icebreaker');
    });
  });

  describe('individual themes', () => {
    it('icebreaker theme has correct metadata', () => {
      const theme = themes.find((t) => t.id === 'icebreaker')!;
      expect(theme.name).toBe('Icebreaker');
      expect(theme.emoji).toBe('🧊');
    });

    it('tech theme has correct metadata', () => {
      const theme = themes.find((t) => t.id === 'tech')!;
      expect(theme.name).toBe('Tech Conference');
      expect(theme.emoji).toBe('💻');
    });

    it('office theme has correct metadata', () => {
      const theme = themes.find((t) => t.id === 'office')!;
      expect(theme.name).toBe('Office Party');
      expect(theme.emoji).toBe('🎊');
    });

    it('adventure theme has correct metadata', () => {
      const theme = themes.find((t) => t.id === 'adventure')!;
      expect(theme.name).toBe('Adventure');
      expect(theme.emoji).toBe('🏔️');
    });
  });
});
