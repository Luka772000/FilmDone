using FilmBACKEND.Dtos.UserDtos;
using FilmBACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmBACKEND.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        void Create(AppUser user);
        Task AddPhoto(Photo photo, int id);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUserAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<GetUserDto> GetUserByIdAsync2(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);
        Task<ActionResult<AppUser>> UpdateUserAsync(UpdateUserDto upDto);
    }
}
