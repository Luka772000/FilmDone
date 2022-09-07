using FilmBACKEND.Dtos.MovieRoleDtos;
using FilmBACKEND.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public RoleController(ILogger<RoleController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }
        [HttpPost]
        public async Task<ActionResult> CreateMovieRole(CreateMovieRoleDto roleDto)
        {
            _logger.LogInformation("CreateMovieRole initiated");
            try
            {
                await _unitOfWork.MovieRoles.PostMovieRole(roleDto);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{movieId}")]
        public async Task<ActionResult<IEnumerable<GetMovieRoleDto>>> GetRoles(int movieId)
        {
            _logger.LogInformation("GetRoles initiated");
            try
            {
                var roles = await _unitOfWork.MovieRoles.GetMoviesRoles(movieId);
                return Ok(roles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception Caught");
                return BadRequest(ex.Message);
            }
        }
    }
}
