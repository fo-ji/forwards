import { generatePageNumbers } from './generate-page-numbers';

describe('generatePageNumbers', () => {
  test('totalPagesがmaxPagesToShow以下の場合、1からtotalPagesまでの配列を返す', () => {
    const result = generatePageNumbers({
      totalPages: 5,
      maxPagesToShow: 10,
      currentPage: 1,
    });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('totalPagesがmaxPagesToShowより多い場合、適切なページ番号の配列を返す - 中央付近のページ', () => {
    const result = generatePageNumbers({
      totalPages: 10,
      maxPagesToShow: 5,
      currentPage: 5,
    });
    expect(result).toEqual([3, 4, 5, 6, 7]);
  });

  test('totalPagesがmaxPagesToShowより多い場合、適切なページ番号の配列を返す - 最初のページ付近', () => {
    const result = generatePageNumbers({
      totalPages: 10,
      maxPagesToShow: 5,
      currentPage: 1,
    });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('totalPagesがmaxPagesToShowより多い場合、適切なページ番号の配列を返す - 最後のページ付近', () => {
    const result = generatePageNumbers({
      totalPages: 10,
      maxPagesToShow: 5,
      currentPage: 10,
    });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });

  test('currentPageが中央付近の場合、正しいページ番号の配列を返す', () => {
    const result = generatePageNumbers({
      totalPages: 20,
      maxPagesToShow: 5,
      currentPage: 10,
    });
    expect(result).toEqual([8, 9, 10, 11, 12]);
  });

  test('currentPageが半分より前の場合、正しいページ番号の配列を返す', () => {
    const result = generatePageNumbers({
      totalPages: 20,
      maxPagesToShow: 5,
      currentPage: 2,
    });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('currentPageが半分より後の場合、正しいページ番号の配列を返す', () => {
    const result = generatePageNumbers({
      totalPages: 20,
      maxPagesToShow: 5,
      currentPage: 19,
    });
    expect(result).toEqual([16, 17, 18, 19, 20]);
  });

  test('maxPagesToShowが1の場合、currentPageだけを含む配列を返す', () => {
    const result = generatePageNumbers({
      totalPages: 20,
      maxPagesToShow: 1,
      currentPage: 10,
    });
    expect(result).toEqual([10]);
  });
});
