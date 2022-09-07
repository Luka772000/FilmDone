namespace FilmBACKEND.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public AppUser User { get; set; }
        public int UserId { get; set; }
    }
}
