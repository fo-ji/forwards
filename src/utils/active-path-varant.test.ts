import { activePathVariant } from './active-path-variant';

describe('activePathVariant', () => {
  test('pathname と targetPath が一致する場合は "default" を返す', () => {
    const res = activePathVariant('/projects', '/projects');
    expect(res).toEqual('default');
  });

  test('pathname と targetPath が一致しない場合は "ghost" を返す', () => {
    const res = activePathVariant('/projects', '/templates');
    expect(res).toEqual('ghost');
  });
});
