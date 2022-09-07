namespace FilmBACKEND.Dtos.UserDtos
{
    public class UpdateUserDto
    {
        public string Username { get; set; }
        public string NewUsername { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string Email { get; set; }
    }
}
