using AutoMapper;
using FilmBACKEND.Dtos.FilmDtos;
using FilmBACKEND.Dtos.MovieDtos;
using FilmBACKEND.Interfaces;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmBACKEND.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MovieCreatingAndRentingController : ControllerBase
    {
        private readonly ILogger<MovieCreatingAndRentingController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public MovieCreatingAndRentingController(ILogger<MovieCreatingAndRentingController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

            
        
        [HttpGet("Films")]
        public async Task<ActionResult<IEnumerable<GetMovieDto>>> GetMoviesList()
        {
            _logger.LogInformation("GetMoviesList initiated");
            try
            {
                var Movies = await _unitOfWork.Movies.GetAllMovies();
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("RentedFilms")]
        public async Task<ActionResult<IEnumerable<GetMovieDto>>> GetRentedMovies()
        {
            _logger.LogInformation("GetRentedMovies initiated");
            try
            {
                var Movies = await _unitOfWork.Movies.GetRentedMovies();
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("unRentedFilms")]
        public async Task<ActionResult<IEnumerable<GetMovieDto>>> GetUnRentedMovies()
        {
            _logger.LogInformation("GetUnRentedMovies initiated");
            try
            {
                var Movies = await _unitOfWork.Movies.GetUnRentedMovies();
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("RenterId/{renterId}")]
        public async Task<ActionResult<IEnumerable<GetMovieDto>>> GetUsersRentedMovies(int renterId)
        {
            _logger.LogInformation("GeUserstRentedMovies initiated");
            try
            {
                var Movies = await _unitOfWork.Movies.GetUsersRentedMovies(renterId);
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("OwnerId/{ownerId}")]
        public async Task<ActionResult<IEnumerable<GetMovieDto>>> GetUsersUploadedMovies(int ownerId)
        {
            _logger.LogInformation("GeUserstOwnedMovies initiated");
            try
            {
                var Movies = await _unitOfWork.Movies.GetUsersUploadedMovies(ownerId);
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("create")]
        public async Task<ActionResult> AddMovie(CreateMovieDto filmDto)
        {
            var user = await _unitOfWork.Users.GetUserByIdAsync(filmDto.OwnerId);
            var movie = new Movie
            {
                Name = filmDto.Name,
                OwnerId = filmDto.OwnerId,
                Owner = user,
                Price = filmDto.Price
            };

            _logger.LogInformation("Create Movie initiated");
            try
            {
                _unitOfWork.Movies.Add(movie);
                _unitOfWork.Complete();
                return Ok(filmDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPut]
        public async Task<ActionResult> UpdateMovie(UpdateMovieDto filmDto)
        {
            _logger.LogInformation("UpdateMovie initiated");
            try
            {
                await  _unitOfWork.Movies.UpdateMovie(filmDto);
                return Ok(filmDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }  
        }
        [HttpPut("Renting")]
        public async Task<ActionResult> RentMovie(RentMovieDto rentMovie)
        {


            _logger.LogInformation("RentMovie initiated");
            try
            {
                await _unitOfWork.Movies.RentMovie(rentMovie);
                return Ok("Completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }

 
        [HttpPut("UnRent")]
        public async Task<ActionResult> UnrentMovie(RentMovieDto rentMovie)
        {
            _logger.LogInformation("UnRentMovie initiated");
            try
            {
                await _unitOfWork.Movies.UnrentMovie(rentMovie);
                return Ok("Completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            _logger.LogInformation("Delete movie initiated");
            try
            {
                await _unitOfWork.Movies.DeleteMovie(id);
                return Ok("Completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }

    }
}
