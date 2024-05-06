import { useRouter } from "next/navigation";
import React from "react";
import { Pagination } from "react-bootstrap";

interface Props {
  totalPages: number;
  currentPage: number;
}

const MyPaginationComponent: React.FC<Props> = ({
  totalPages,
  currentPage,
}) => {
  const pagesToShow = 5;
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/main/${page}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <Pagination.Item
          className="page-number"
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <Pagination.Prev
        className="pagination-prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      {renderPageNumbers()}
      <Pagination.Next
        className="pagination-next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default MyPaginationComponent;
