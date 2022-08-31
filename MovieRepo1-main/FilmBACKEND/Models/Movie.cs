using System.Collections.Generic;


namespace FilmBACKEND.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public List<MovieRole> MovieRoles { get; set; }
        public int OwnerId { get; set; }
        public AppUser Owner { get; set; }
        public int? RenterId { get; set; }
        public AppUser Renter { get; set; }
    }
}
