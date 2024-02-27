/* eslint-disable react/prop-types */
import "./pagination.css"
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = (e) => {
    e.preventDefault();
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={goToPrevPage} href="">
            Previous
          </a>
        </li>
        
        <li className="page-item">
          <a className="page-link" onClick={goToNextPage} href="#">
            Next
          </a>
        </li>
      
    </div>
  );
};

export default Pagination;