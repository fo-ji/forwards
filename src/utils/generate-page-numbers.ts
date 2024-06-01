export const generatePageNumbers = ({
  totalPages,
  maxPagesToShow,
  currentPage,
}: {
  totalPages: number;
  maxPagesToShow: number;
  currentPage: number;
}): number[] => {
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(currentPage - half, 1);
  let end = Math.min(currentPage + half, totalPages);

  if (currentPage <= half) {
    start = 1;
    end = maxPagesToShow;
  } else if (currentPage > totalPages - half) {
    start = totalPages - maxPagesToShow + 1;
    end = totalPages;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
