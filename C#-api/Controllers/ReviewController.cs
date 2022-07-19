using films_assignment_api.ApiModels;
using films_assignment_api.DataLayer;
using films_assignment_api.DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace films_assignment_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly DbService<Review> _dbReviews;

        public ReviewController(DbService<Review> dbReviews)
        {
            _dbReviews = dbReviews;
        }

        [HttpGet(Name = "GetReviewsForFilm")]
        public IEnumerable<Review> GetForFilm([FromQuery] string filmId)
        {
            return _dbReviews.Find(r => r.FilmId == filmId).OrderByDescending(r => r.Date);
        }
        public ActionResult AddReview(Review review)
        {
            review.Date = DateTime.Now;
            _dbReviews.Insert(review);
            return Ok(review);   
        }

    }
}