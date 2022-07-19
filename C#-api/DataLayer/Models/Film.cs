namespace films_assignment_api.DataLayer.Models
{
    public class Film : BaseModel
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string ShortSummary { get; set; }
        public int Runtime { get; set; }
        public string ReleaseDate { get; set; }
        public string Distributor { get; set; }
        public List<string> Genres { get; set; }
    }
}
