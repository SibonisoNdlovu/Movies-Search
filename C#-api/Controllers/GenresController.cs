using films_assignment_api.ApiModels;
using films_assignment_api.DataLayer;
using films_assignment_api.DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace films_assignment_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly DbService<Genre> _dbGenres;
        public GenresController(DbService<Genre> dbGenres)
        {
            _dbGenres = dbGenres;
        }

        [HttpGet(Name = "GetGenres")]
        public IEnumerable<Genre> Get()
        {
            return _dbGenres.FindAll();
        }
    }
}