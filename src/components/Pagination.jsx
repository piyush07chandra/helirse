import PropTypes from 'prop-types';
import './Pagination.css'

const Pagination = ({currentPage, totalPages, onPageChange} ) => {
  

  return (
    <div className='pagination'>
     <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="page-number">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>

    </div>
  );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };
  

export default Pagination;