import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  itemsPerPage: number;
  dataLength: number;
  forcePage: number;
  route: string;
}

const Pagination = ({
  itemsPerPage,
  dataLength,
  forcePage,
  route,
}: PaginationProps) => {
  const navigate = useNavigate();
  const pageCount = Math.ceil(dataLength / itemsPerPage);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(selectedItem) => {
        navigate(`${route}?page_num=${selectedItem.selected}`);
        navigate(0);
      }}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={() => {}}
      className="flex justify-center space-x-2 items-center mt-16"
      pageClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
      activeClassName="bg-gray-300 rounded-md px-2 py-1"
      previousClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
      nextClassName="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
      forcePage={forcePage}
    />
  );
};

export default Pagination;
