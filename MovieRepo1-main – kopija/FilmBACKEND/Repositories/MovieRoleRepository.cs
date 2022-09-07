using AutoMapper;
using AutoMapper.QueryableExtensions;
using FilmBACKEND.Dtos.ActorDtos;
using FilmBACKEND.Dtos.MovieRoleDtos;
using FilmBACKEND.Interfaces;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmBACKEND.Repositories
{
    public class MovieRoleRepository : GenericRepository<MovieRole>, IMovieRoleRepository
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public MovieRoleRepository(Context context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteMovieRole(int id)
        {
            var role = await _context.MovieRoles.FirstOrDefaultAsync(u => u.ActorId == id);
            _context.MovieRoles.Remove(role);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GetMovieRoleDto>> GetAllMovieRoles()
        {
            return await _context.MovieRoles.ProjectTo<GetMovieRoleDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<IEnumerable<GetMovieRoleDto>> GetMoviesRoles(int id)
        {
            return await _context.MovieRoles.ProjectTo<GetMovieRoleDto>(_mapper.ConfigurationProvider).Where(i => i.MovieId == id).ToListAsync();
        }

        public async Task PostMovieRole(CreateMovieRoleDto movieRoleDto)
        {
            var movie = await _context.Movies.Where(u => u.Id == movieRoleDto.MovieId).Include(i => i.MovieRoles).SingleOrDefaultAsync();
            if (movie == null)
            {
                throw new System.Exception("Movie not found");
            }

            var actor = await _context.Actors.Where(u => u.Name == movieRoleDto.ActorName).SingleOrDefaultAsync();
            if (actor == null)
            {
                actor = new Actor
                {
                    Name = movieRoleDto.ActorName
                };
                _context.Actors.Add(actor);
                await _context.SaveChangesAsync();
                actor = await _context.Actors.Where(u => u.Name == movieRoleDto.ActorName).SingleOrDefaultAsync();
            }

            var movieRole = new MovieRole
            {
                MovieId = movieRoleDto.MovieId,
                ActorId = actor.Id,
                RoleName = movieRoleDto.RoleName
            };
            _context.MovieRoles.Add(movieRole);
            movie.MovieRoles.Add(movieRole);

            await _context.SaveChangesAsync();



        }
    }
}
