namespace FilmBACKEND.Models
{
    public class MovieRole
    {
        public string RoleName { get; set; }
        public Movie Movie { get; set; }
        public int MovieId { get; set; }
        public Actor Actor { get; set; }
        public int ActorId { get; set; }
    }
}
