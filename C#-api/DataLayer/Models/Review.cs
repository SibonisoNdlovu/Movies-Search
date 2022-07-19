namespace films_assignment_api.DataLayer.Models
{
    public class Review : BaseModel
    {
        public string FilmId { get; set; }
        public string Text { get; set; }
        public string User { get; set; }
        public int Score { get; set; }
        public DateTime Date { get; set; }
    }
}
