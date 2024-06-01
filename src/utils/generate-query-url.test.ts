import { generateQueryURL } from './generate-query-url';

describe('generateQueryURL', () => {
  test('引数のobjのvalueがnull, undefined, ""の場合、パラメータに加えない', () => {
    const params = {
      param1: 'value1',
      param2: 42,
      param3: 0,
      param4: true,
      param5: false,
      param6: null,
      param7: undefined,
      param8: '',
    };

    const result = generateQueryURL(baseUrl, params);

    expect(result).toBe(
      'https://example.com/api?param1=value1&param2=42&param3=0&param4=true&param5=false',
    );
  });

  test('引数のobjが空の場合、baseUrlを返す', () => {
    const params = {};

    const result = generateQueryURL(baseUrl, params);

    expect(result).toBe('https://example.com/api');
  });
});

const baseUrl = 'https://example.com/api';
