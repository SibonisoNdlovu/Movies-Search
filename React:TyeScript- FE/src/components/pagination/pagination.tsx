/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './pagination.scss'

export const Pagination = ({ filmsPerPage, totalFilms, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link" href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}


export default Pagination;