import '../tags/tags.scss'
import { Genre } from "../../api/models/genre";

function GenreTags({genres}:any) {
  if(!genres) {
    return <></>
  }
  return ( 
    <article className='tags'>
      { 
        genres!.map((genre:Genre) => 
          <span key={genre.id} className='tag'>
            {genre.name}
          </span>)
        }
    </article>
  );
}

export default GenreTags;