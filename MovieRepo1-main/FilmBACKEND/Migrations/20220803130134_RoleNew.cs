using Microsoft.EntityFrameworkCore.Migrations;

namespace FilmBACKEND.Migrations
{
    public partial class RoleNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "MovieRoles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "MovieRoles");
        }
    }
}
