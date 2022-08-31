using FilmBACKEND.Dtos.UserDtos;

namespace FilmBACKEND.Dtos.FilmDtos
{
    public class GetMovieDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RenterId { get; set; }
        public GetUserDto Renter { get; set; }
        public int OwnerId { get; set; }
        public GetUserDto Owner { get; set; }
        public int Price { get; set; }
    }
}
