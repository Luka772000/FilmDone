using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FilmBACKEND.Models
{
    public class Context :
        IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.AppUser)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            modelBuilder.Entity<Photo>()
                .HasOne(u => u.User)
                .WithOne(p => p.Photos)
                .HasForeignKey<Photo>(ui => ui.UserId);
            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();


            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.OwnedMovies)
                .WithOne(p => p.Owner)
                .HasForeignKey(ur => ur.OwnerId);


            modelBuilder.Entity<Movie>()
                .HasOne(r => r.Renter)
                .WithMany(m => m.RentedMovies)
                .HasForeignKey(ri => ri.RenterId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<MovieRole>()
                .HasKey(k => new { k.ActorId, k.MovieId });

            modelBuilder.Entity<MovieRole>()
                .HasOne(a => a.Actor)
                .WithMany(c => c.MovieRoles)
                .HasForeignKey(ai => ai.ActorId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<MovieRole>()
                .HasOne(a => a.Movie)
                .WithMany(c => c.MovieRoles)
                .HasForeignKey(ai => ai.MovieId)
                .OnDelete(DeleteBehavior.NoAction);
        }




        public DbSet<MovieRole> MovieRoles { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Photo> Photos { get; set; }


    }

}
