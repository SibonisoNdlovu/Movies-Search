using films_assignment_api.DataLayer.Models;

namespace films_assignment_api.ApiModels
{
    public class FilmModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string ShortSummary { get; set; }
        public int Runtime { get; set; }
        public string ReleaseDate { get; set; }
        public string Distributor { get; set; }
        public List<Genre> Genres { get; set; }
        public List<Review> Reviews { get; set; }
        public string PosterUrl { get; set; } = "/poster.png";

        public static FilmModel FromModel(Film model, IEnumerable<Genre> allGenres)
        {
            return new FilmModel()
            {
                Id = model.Id,
                Distributor = model.Distributor,
                ReleaseDate = model.ReleaseDate,
                Genres = allGenres.Where(g => model.Genres.Contains(g.Id)).ToList(),
                Runtime = model.Runtime,
                ShortSummary = model.ShortSummary,
                Summary = model.Summary,
                Title = model.Title,
            };
        }
        public static FilmModel FromModel(Film model, IEnumerable<Genre> allGenres, IEnumerable<Review> allReviews)
        {
            var filmModel =  FilmModel.FromModel(model, allGenres);
            filmModel.Reviews = allReviews.Where(r => r.FilmId.Equals(model.Id)).ToList(); 
            return filmModel;
        }
    }
}
