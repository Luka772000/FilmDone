using FilmBACKEND.Dtos.ActorDtos;
using FilmBACKEND.Dtos.FilmDtos;

namespace FilmBACKEND.Dtos.MovieRoleDtos
{
    public class GetMovieRoleDto
    {
        public string RoleName { get; set; }
        public int MovieId { get; set; }
        public GetMovieDto Movie { get; set; }
        public int ActorId { get; set; }
        public GetActorDto Actor { get; set; }
    }
}
