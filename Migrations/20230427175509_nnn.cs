﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TelnetTeamBack.Migrations
{
    public partial class nnn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SignalrId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    utilisateurId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.id);
                    table.ForeignKey(
                        name: "FK_Connections_Utilisateurs_utilisateurId",
                        column: x => x.utilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connections_utilisateurId",
                table: "Connections",
                column: "utilisateurId");
        }
    }
}