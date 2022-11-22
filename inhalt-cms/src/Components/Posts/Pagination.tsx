import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  itemsPerPage: number;
  dataLength: number;
  onPageChange?: ((selectedItem: { selected: number }) => void) | undefined;
}

const Pagination = ({
  itemsPerPage,
  dataLength,
  onPageChange,
}: PaginationProps) => {
  const pageCount = Math.ceil(dataLength / itemsPerPage);

  //   const handlePageClick: React.FC<{ selected: number }> = ({ selected }) => {
  //     const newOffset = (selected * itemsPerPage) % dataLength;
  //     console.log(
  //       `User requested page number ${selected}, which is offset ${newOffset}`
  //     );
  //     return null;
  //   };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={() => {}}
      className="flex justify-center space-x-2 items-center mt-16"
      pageClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
      activeClassName="bg-gray-300 rounded-md px-2 py-1"
      previousClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
      nextClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
    />
  );
};

export default Pagination;
