using FilmBACKEND.Dtos.PhotoDtos;
using System.Collections.Generic;

namespace FilmBACKEND.Dtos.UserDtos
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public PhotoDto Photos { get; set; }

    }
}
