using AutoMapper;
using FilmBACKEND.Dtos.ActorDtos;
using FilmBACKEND.Dtos.FilmDtos;
using FilmBACKEND.Dtos.MovieRoleDtos;
using FilmBACKEND.Dtos.PhotoDtos;
using FilmBACKEND.Dtos.UserDtos;
using FilmBACKEND.Models;

namespace FilmBACKEND.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<AppUser, RegisterDTO>().ReverseMap();
            CreateMap<MemberDto, AppUser>().ReverseMap();
            CreateMap<AppUser, GetUserDto>().ReverseMap();
            CreateMap<AppUser, UpdateUserDto>().ReverseMap();

            CreateMap<Photo, PhotoDto>().ReverseMap();


            CreateMap<CreateMovieDto, Movie>().ReverseMap();
            CreateMap<GetMovieDto, Movie>().ReverseMap();

            CreateMap<CreateActorDto, Actor>().ReverseMap();
            CreateMap<GetActorDto, Actor>().ReverseMap();
            CreateMap<GetMovieRoleDto,MovieRole>().ReverseMap();

        }
    }
}
