using films_assignment_api.DataLayer;
using films_assignment_api.DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace films_assignment_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PopulateController : ControllerBase
    {
        private readonly DbService<Film> _dbFilm;
        private readonly DbService<Genre> _dbGenres;

        public PopulateController(DbService<Film> dbFilm, DbService<Genre> dbGenres)
        {
            _dbFilm = dbFilm;
            _dbGenres = dbGenres;
        }


        [HttpPost(Name = "PostFilmsData")]
        public int Post(DataImport data)
        {
            _dbFilm.DeleteAll();
            _dbGenres.DeleteAll();

            var allGenres = data.RelatedData.Genres.Select(g => new Genre() { Id = g.Id, Name = g.Name.Text });
            _dbGenres.InsertBulk(allGenres);

            var allFilms = data.Films.Where(f=>f.ShortSynopsis!=null && f.Synopsis!=null).Select(f => new Film()
            {
                Id = f.Id,
                Title = f.Title.Text,
                Distributor = f.DistributorName,
                Genres = f.GenreIds,
                ReleaseDate = f.ReleaseDate,
                Runtime = f.RuntimeInMinutes,
                ShortSummary = f.ShortSynopsis.Text,
                Summary = f.Synopsis.Text
            });
            var count = _dbFilm.InsertBulk(allFilms);

            return count;
        }


        public class DataImport
        {
            public List<FilmImport> Films { get; set; }
            public RelatedData RelatedData { get; set; }
        }
        public class RelatedData
        {
            public List<GenreImport> Genres { get; set; }
        }
        public class FilmImport
        {
            public string Id { get; set; }
            public Translatable Title { get; set; }
            public Translatable? Synopsis { get; set; }
            public Translatable? ShortSynopsis { get; set; }
            public string DistributorName { get; set; }
            public string ReleaseDate { get; set; }
            public List<string> GenreIds { get; set; }
            public int RuntimeInMinutes { get; set; }
        }

        public class GenreImport
        {
            public string Id { get; set; }
            public Translatable Name { get; set; }
        }

        public class Translatable
        {
            public string Text { get; set; }
        }
    }
}