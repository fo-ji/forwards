import { toPoliteJapanese } from './to-polite-japanese';

describe('toPoliteJapanese', () => {
  // Mock Math.random to control the random selection
  const originalMathRandom = Math.random;

  beforeEach(() => {
    jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Math.random = originalMathRandom;
  });

  test('入力文字列に丁寧な語尾を追加すること', () => {
    const result = toPoliteJapanese('これはペン');

    // Check that the result starts with the input string
    expect(result.startsWith('これはペン')).toBe(true);

    // Check that one of the polite endings was appended
    const politeEndings = [
      'です',
      'ます',
      'でございます',
      'だと思います',
      'でしょう',
    ];
    const hasPoliteEnding = politeEndings.some((ending) =>
      result.endsWith(ending),
    );
    expect(hasPoliteEnding).toBe(true);
  });

  test('空の文字列入力を処理すること', () => {
    const result = toPoliteJapanese('');

    // Result should just be one of the polite endings
    const politeEndings = [
      'です',
      'ます',
      'でございます',
      'だと思います',
      'でしょう',
    ];
    expect(politeEndings).toContain(result);
  });

  test('ランダム選択に基づいて特定の語尾を使用すること', () => {
    // Test with first ending
    Math.random = jest.fn().mockReturnValue(0);
    expect(toPoliteJapanese('こんにちは')).toBe('こんにちはです');

    // Test with last ending
    Math.random = jest.fn().mockReturnValue(0.99);
    expect(toPoliteJapanese('こんにちは')).toBe('こんにちはでしょう');
  });
});
