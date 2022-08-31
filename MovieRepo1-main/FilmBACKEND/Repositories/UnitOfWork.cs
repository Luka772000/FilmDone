using AutoMapper;
using FilmBACKEND.Interfaces;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Identity;

namespace FilmBACKEND.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        public UnitOfWork(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            Movies = new MovieRepository(_context, _mapper);
            MovieRoles = new MovieRoleRepository(_context, _mapper);
            Users = new UserRepository(_context, _mapper);
        }
        public IMovieRepository Movies { get; private set; }
        public IUserRepository Users { get; private set; }
        public IPhotoService PhotoService { get; private set; }
        public IMovieRoleRepository MovieRoles { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
