import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { Film } from '../../api/models/film';
import  FilmCard  from '../filmCard/filmCard';
import Spinner from '../spinner/spinner';
import './filmList.scss'
import Pagination from '../pagination/pagination';

function List({ genre, title }:any) {
  const [films, setFilms] = useState<Film[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filmPerPage] = useState(12);

  //get all films from endpoint
  useEffect(() => {
    const getFilms =async () => {
      try {
        var filmsData = await api.getFilms({genre, title});
        setFilms(filmsData);
      } catch ({error}) {
        console.log(error);
      }
    }
    getFilms();
  },[genre, title]);


  //get current films
  const indexOfLastFilm = currentPage * filmPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmPerPage;
  const currentFilms = films?.slice(indexOfFirstFilm, indexOfLastFilm);

  //change page
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  if (films && films.length > 0) {
    return (
      <section>
        <article className="list">
          {currentFilms?.map(film => <FilmCard key={film.id} {...film} />)}
        </article>
        <section>
        <Pagination 
              filmsPerPage={filmPerPage} 
              totalFilms={films?.length} 
              paginate={paginate} />              
              {
                films && films?.length > 0 ? <span>{`${currentPage} of ${Math.ceil(films?.length/12)}`}</span> : ''
              }
        </section>  
      </section>
    );
  } 
  return genre? <h4>Could not find films with {genre}</h4> : <Spinner/>
}

export default List;