import { useMemo } from 'react'
import { IPagination } from '../types'

interface PaginationProps {
  pagination: IPagination;
  handlePageClick: (page: number) => void;
  perPage: (page: number) => void;
  setPerPage: (page: number) => void;
}

const Pagination = ({ pagination, handlePageClick, perPage, setPerPage }: PaginationProps) => {
  const pages = useMemo(() => {
    const { currentPage, totalPages } = pagination
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4)
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4)
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [pagination])

  return (
    <nav className="d-flex justify-content-end">
      <div className="d-flex gap-3">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {perPage.toString()}
          </button>
          <ul className="dropdown-menu">
            {[2, 5, 10, 15, 20].map((i) => (
              <li key={i}><a className="dropdown-item" onClick={() => setPerPage(i)}>{i}</a></li>
            ))}
          </ul>
        </div>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageClick(pagination.currentPage - 1)}
            >
              Previo
            </button>
          </li>
          {pages.map((page) => (
            <li key={page} className={`page-item ${pagination.currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageClick(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handlePageClick(pagination.currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Pagination