using FilmBACKEND.Dtos.FilmDtos;
using FilmBACKEND.Dtos.MovieRoleDtos;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmBACKEND.Interfaces
{
    public interface IMovieRoleRepository : IGenericRepository<MovieRole>
    {
        Task<IEnumerable<GetMovieRoleDto>> GetAllMovieRoles();
        Task<IEnumerable<GetMovieRoleDto>> GetMoviesRoles(int id);
        Task PostMovieRole(CreateMovieRoleDto movieRoleDto);
        Task DeleteMovieRole(int id);
    }
}
