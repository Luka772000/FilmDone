using Microsoft.AspNetCore.Identity;

namespace FilmBACKEND.Models
{
    public class AppUserRole : IdentityUserRole<int>
    {

        public AppUser AppUser { get; set; }
        public AppRole Role { get; set; }
    }
}
