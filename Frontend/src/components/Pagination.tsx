import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination:FC<PaginationProps> = ({currentPage,totalPages,onPageChange}) => {
    const handlePrevious=() => {
        if(currentPage>1) onPageChange(currentPage-1)
    }

    const handleNext=() => {
        if(currentPage<totalPages) onPageChange(currentPage+1)
    }
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="border px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="border px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination
