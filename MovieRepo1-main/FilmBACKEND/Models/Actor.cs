using System.Collections.Generic;

namespace FilmBACKEND.Models
{
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MovieRole> MovieRoles { get; set; }
    }
}
        