using FilmBACKEND.Models;

namespace FilmBACKEND.Repositories
{
    internal class DeveloperRepository
    {
        private Context context;

        public DeveloperRepository(Context context)
        {
            this.context = context;
        }
    }
}