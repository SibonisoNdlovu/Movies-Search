import { api } from '../../api/api';
import Tags from '../tags/tags';
import { Link } from 'react-router-dom';
import { Film } from '../../api/models/film';
import './filmCard.scss';

const FilmCard = ({ id, title, genres, shortSummary, posterUrl }: Partial<Film>) => (
  <section className="movie-card">
    <section
      className="thumb"
      style={{ backgroundImage: `url(${api.BaseUrl + posterUrl})` }}
    ></section>
    <section className="body">
      <header>
        <h1>
          <Link to={`/film/${id}`}>{title}</Link>
        </h1>
      </header>
      <Tags genres={genres} />
      <footer>
        <p>{shortSummary}</p>
      </footer>
    </section>
  </section>
);

export default FilmCard;