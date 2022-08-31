using AutoMapper;
using AutoMapper.QueryableExtensions;
using FilmBACKEND.Dtos.PhotoDtos;
using FilmBACKEND.Dtos.UserDtos;
using FilmBACKEND.Interfaces;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmBACKEND.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly Context _context;
        private readonly IPhotoService _photoService;
        private readonly ILogger<MovieCreatingAndRentingController> _logger;
        public UserController(ILogger<MovieCreatingAndRentingController> logger, IUnitOfWork unitOfWork, IMapper mapper, Context context, IPhotoService photoService)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
            _photoService = photoService;
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<List<PhotoDto>>> AddPhoto(int id, IFormFile file)
        {

                


            _logger.LogInformation("Add-photo initiated");
            try
            {
                    var user = await _unitOfWork.Users.GetUserByIdAsync(id);
                    var result = await _photoService.AddPhotoAsync(file);

                    if (result.Error != null) return BadRequest(result.Error.Message);
                    var photo = new Photo
                    { 
                        UserId = user.Id,
                        Url = result.SecureUrl.AbsoluteUri,
                        PublicId = result.PublicId
                    };
                    _context.Photos.Add(photo);
                    user.Photos = photo;
                    await _context.SaveChangesAsync();
                    return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("UserId/{Id}")]
        public async Task<ActionResult<IEnumerable<GetUserDto>>> GetUsersRentedMovies(int Id)
        {

            _logger.LogInformation("GeUserstRentedMovies initiated");
            try
            {
                var user = await _unitOfWork.Users.GetUserByIdAsync2(Id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }

        }


    }
}
