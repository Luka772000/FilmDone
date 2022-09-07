using FilmBACKEND.Dtos.FilmDtos;
using FilmBACKEND.Dtos.MovieDtos;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmBACKEND.Interfaces
{
    public interface IMovieRepository : IGenericRepository<Movie>
    {
        IEnumerable<Movie> GetMoviesCount(int count);
        Task<ActionResult<IEnumerable<GetMovieDto>>> GetAllMovies();
        Task<IEnumerable<GetMovieDto>> GetRentedMovies();
        Task<IEnumerable<GetMovieDto>> GetUnRentedMovies();
        Task<IEnumerable<GetMovieDto>> GetUsersRentedMovies(int id);
        Task<IEnumerable<GetMovieDto>> GetUsersUploadedMovies(int id);
        Task RentMovie(RentMovieDto rentMovie);
        Task UnrentMovie(RentMovieDto rentMovie);
        Task DeleteMovie(int id);
        Task UpdateMovie(UpdateMovieDto movieDto);
    }
}
