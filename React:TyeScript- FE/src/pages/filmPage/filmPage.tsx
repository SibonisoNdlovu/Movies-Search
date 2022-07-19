import './filmPage.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Film } from "../../api/models/film";
import { Review } from "../../api/models/review";
import Tags from '../../components/tags/tags';
import ReviewCard from '../../components/reviewCard/reviewCard';
import Modal from '../../components/reviewModal/reviewModal';
import Pagination from '../../components/pagination/pagination';


function ViewFilm() {
  const {id} =useParams();
  const [film, setFilm] = useState<Film>();
  const [reviews, setReviews] = useState<Review[]>();
  const [openModal, setOpenModal] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(3);

  // get film from endpoint
  useEffect(() => {
    const getFilm = async (id:string) => {
      try {
          const film =  await api.getFilm(id);
          setFilm(film);
          setReviews(film?.reviews);
      } catch ({message}) {
        console.log(message)
      }
    }

    getFilm(id!)
  },[id]);

  // add review to list after creating one to avoid having to refetch from api
  const addReviewToList = (review:Review) => { 
    reviews?.push(review);
  };

    //get current films
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);
  
    //change page
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  return ( 
  <section className="view-film">
    { openModal && <Modal setOpenModal={setOpenModal} addReviewToList={addReviewToList}></Modal>}
    <section className="thumb" style={{backgroundImage: `url(${api.BaseUrl+film?.posterUrl})`}}>
      <h2 className='movie-header'>{film?.title}</h2>
      <h4>{`${film?.runtime} Min`}</h4>
    </section>
    <h5>Tags: </h5>  <Tags genres={film?.genres}/>
    <br/>
    <section className="body">
      <details className='details'> 
        <summary> Summary </summary>  <br/>
        {film?.summary} 
      </details>
      
      <h5>Distributor : {film?.distributor}</h5>
      <h5>Release Date : {film?.releaseDate}</h5>
    </section>

    <section>
      <details className='reviews'>        
          <summary className='reviewSummary'>Reviews <span/>
            <button className='add-review' onClick={() => setOpenModal(true)}/>
            <br/>
          </summary>
          <br></br>
          <section className='reviews-list'>
            {(currentReviews && currentReviews.length>0) ? currentReviews.map(review => <ReviewCard key={review.id} {...review} />) : <h2>No Reviews...</h2>}
            <span/> <br/>
            <footer>
              <Pagination 
                filmsPerPage={reviewsPerPage} 
                totalFilms={reviews?.length} 
                paginate={paginate} /> 
                {
                  reviews && reviews?.length > 0 ? <span>{`${currentPage} of ${Math.ceil(reviews?.length/3)}`}</span> : ''
                }
            </footer>
           
          </section>

      </details>
    </section>
  </section>
  );
}


export default ViewFilm;