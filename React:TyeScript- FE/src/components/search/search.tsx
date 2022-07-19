import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { Genre } from '../../api/models/genre';
import './search.scss';

function Search({genre = '', changeGenre, search, title}: any) {
  const [genres, setGenre] = useState<Genre[]>();
  const [placeholder, setPlaceholder] = useState("No Genres");
  
  useEffect(()=> {
    const getGenres = async () => {
      try {
        const genresList = await api.getGenres();
        setGenre(genresList);
        setPlaceholder('Filter Genres');
      } catch ({err}) {
        console.log(err);
      }
    }
    getGenres();
  }, [])

  return (
    <article className="search">
      <section className="search-bar">
        <input 
          type="text"
          value={title}
          name="search" 
          id="search"
          placeholder="Search By Film Name..."
          onChange={(e) => search(e.currentTarget.value)} />
      </section>
      <section className="genre-bar">
        <select name="genre" id="genre" title="filter film by genre" onChange={(e) => changeGenre(e.currentTarget.value)} value={genre}> 
          <option value={''}>
            { placeholder }
          </option> { genres?.map(g => <option key={g.id} value={g.name}>{g.name}</option>) }
        </select>
      </section>
    </article>
  );
}

export default Search;