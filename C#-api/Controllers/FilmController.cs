using films_assignment_api.ApiModels;
using films_assignment_api.DataLayer;
using films_assignment_api.DataLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace films_assignment_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmController : ODataController
    {
        private readonly DbService<Film> _dbFilm;
        private readonly DbService<Genre> _dbGenres;
        private readonly DbService<Review> _dbReviews;

        public FilmController(DbService<Film> dbService, DbService<Genre> dbGenres, DbService<Review> dbReviews)
        {
            _dbFilm = dbService;
            _dbReviews = dbReviews;
            _dbGenres = dbGenres;
        }

        [HttpGet(Name = "GetFilms")]
        [EnableQuery()]
        public IEnumerable<FilmModel> Get()
        {
            var dbGenres = _dbGenres.FindAll();
            var dbFilms = _dbFilm.FindAll();
            return dbFilms.OrderBy(f => f.Title)
                          .Select(film => FilmModel.FromModel(film, dbGenres));
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FilmModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}", Name = "GetFilmById")]
        public IActionResult GetById(string id)
        {
            var allGenres = _dbGenres.FindAll();
            var allReviews = _dbReviews.FindAll();
            var dbFilm = _dbFilm.FindOne(id);

            if (dbFilm == null) return NotFound();
            return  Ok(FilmModel.FromModel(dbFilm, allGenres, allReviews));
        }


        [HttpGet("autocomplete", Name = "GetAutocompleteFilms")]
        public IEnumerable<string> GetAutocomplete()
        {
            var dbFilms = _dbFilm.FindAll();

            IEnumerable<string> films = dbFilms.OrderBy(f => f.Title)
                             .Select(f => f.Title);
            return films;
        }
    }
}