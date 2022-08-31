using FilmBACKEND.Models;

namespace FilmBACKEND.Dtos.MovieRoleDtos
{
    public class CreateMovieRoleDto
    {
        public int MovieId { get; set; }
        public string ActorName { get; set; }
        public string RoleName { get; set; }
    }
}
