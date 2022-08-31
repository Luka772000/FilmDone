using FilmBACKEND.Models;
using System.Threading.Tasks;

namespace FilmBACKEND.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
