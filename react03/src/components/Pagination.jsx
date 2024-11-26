import React from "react";

const Pagination = ({ currentPage, totalProducts, pageSize, onPageChange }) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
