import { Pagination } from '@consta/uikit/Pagination';
import './Pagination.css';

export const PaginationExampleType = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <>
      <Pagination
        type="default"
        items={totalPages}
        visibleCount={7}
        value={currentPage}
        onChange={setCurrentPage}
      />
    </>
  );
};
