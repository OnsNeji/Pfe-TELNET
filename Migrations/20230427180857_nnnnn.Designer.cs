﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TelnetTeamBack.Context;

namespace TelnetTeamBack.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230427180857_nnnnn")]
    partial class nnnnn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TelnetTeamBack.models.Connection", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ConnectedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("SignalrId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("utilisateurId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("utilisateurId");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Convention", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateDebut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateFin")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PieceJointe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Conventions");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Demande", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Document")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("UtilisateurId");

                    b.ToTable("Demandes");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Département", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ChefD")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateAjout")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModif")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SiteId")
                        .HasColumnType("int");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserModif")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("SiteId");

                    b.ToTable("Départements");
                });

            modelBuilder.Entity("TelnetTeamBack.models.EmployéMois", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("int");

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.HasIndex("UtilisateurId");

                    b.ToTable("EmployéMois");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Evenement", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateEvent")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Evenements");
                });

            modelBuilder.Entity("TelnetTeamBack.models.MariageNaissance", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("MessageVoeux")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("UtilisateurId");

                    b.ToTable("MariageNaissances");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Message", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime2");

                    b.Property<string>("message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("senderId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("senderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("TelnetTeamBack.models.MédiaEvent", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("EvenementId")
                        .HasColumnType("int");

                    b.Property<string>("PieceJointe")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("EvenementId");

                    b.ToTable("MediaEvents");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Notification", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ConventionId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EmployéMoisId")
                        .HasColumnType("int");

                    b.Property<int?>("EvenementId")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NouveautéId")
                        .HasColumnType("int");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ConventionId")
                        .IsUnique()
                        .HasFilter("[ConventionId] IS NOT NULL");

                    b.HasIndex("EmployéMoisId")
                        .IsUnique()
                        .HasFilter("[EmployéMoisId] IS NOT NULL");

                    b.HasIndex("EvenementId")
                        .IsUnique()
                        .HasFilter("[EvenementId] IS NOT NULL");

                    b.HasIndex("NouveautéId")
                        .IsUnique()
                        .HasFilter("[NouveautéId] IS NOT NULL");

                    b.ToTable("notifications");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Nouveauté", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DatePublication")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PieceJointe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SiteId")
                        .HasColumnType("int");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("SiteId");

                    b.ToTable("Nouveautés");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Poste", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAjout")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModif")
                        .HasColumnType("datetime2");

                    b.Property<string>("Etage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numéro")
                        .HasColumnType("int");

                    b.Property<int>("SiteId")
                        .HasColumnType("int");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserModif")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("SiteId");

                    b.HasIndex("UtilisateurId")
                        .IsUnique();

                    b.ToTable("Postes");
                });

            modelBuilder.Entity("TelnetTeamBack.models.ProjectSuccess", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PieceJointe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProjetId")
                        .HasColumnType("int");

                    b.Property<string>("Titre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ProjetId");

                    b.ToTable("ProjectSuccesses");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Projet", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Budget")
                        .HasColumnType("real");

                    b.Property<DateTime>("DateDébut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateFin")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Projets");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Site", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAjout")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModif")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserModif")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("adresse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("fax")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("site")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("tel")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Sites");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Utilisateur", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAjout")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateEmbauche")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModif")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateNaissance")
                        .HasColumnType("datetime2");

                    b.Property<int>("DepartementId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Matricule")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MotDePasse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Salaire")
                        .HasColumnType("real");

                    b.Property<bool>("Supprimé")
                        .HasColumnType("bit");

                    b.Property<string>("Tel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserAjout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserModif")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("DepartementId");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Connection", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Utilisateur")
                        .WithMany("Connections")
                        .HasForeignKey("utilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utilisateur");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Demande", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Utilisateur")
                        .WithMany("Demandes")
                        .HasForeignKey("UtilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utilisateur");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Département", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Site", "Site")
                        .WithMany("Départements")
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Site");
                });

            modelBuilder.Entity("TelnetTeamBack.models.EmployéMois", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Utilisateur")
                        .WithMany("EmployéMois")
                        .HasForeignKey("UtilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utilisateur");
                });

            modelBuilder.Entity("TelnetTeamBack.models.MariageNaissance", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Utilisateur")
                        .WithMany("MariageNaissances")
                        .HasForeignKey("UtilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Utilisateur");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Message", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Sender")
                        .WithMany("Messages")
                        .HasForeignKey("senderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("TelnetTeamBack.models.MédiaEvent", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Evenement", "Evenement")
                        .WithMany("MediaEvents")
                        .HasForeignKey("EvenementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Evenement");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Notification", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Convention", "Convention")
                        .WithOne("Notification")
                        .HasForeignKey("TelnetTeamBack.models.Notification", "ConventionId");

                    b.HasOne("TelnetTeamBack.models.EmployéMois", "EmployéMois")
                        .WithOne("Notification")
                        .HasForeignKey("TelnetTeamBack.models.Notification", "EmployéMoisId");

                    b.HasOne("TelnetTeamBack.models.Evenement", "Evenement")
                        .WithOne("Notification")
                        .HasForeignKey("TelnetTeamBack.models.Notification", "EvenementId");

                    b.HasOne("TelnetTeamBack.models.Nouveauté", "Nouveauté")
                        .WithOne("Notification")
                        .HasForeignKey("TelnetTeamBack.models.Notification", "NouveautéId");

                    b.Navigation("Convention");

                    b.Navigation("EmployéMois");

                    b.Navigation("Evenement");

                    b.Navigation("Nouveauté");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Nouveauté", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Site", "Site")
                        .WithMany("Nouveautés")
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Site");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Poste", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Site", "Site")
                        .WithMany("Postes")
                        .HasForeignKey("SiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TelnetTeamBack.models.Utilisateur", "Utilisateur")
                        .WithOne("Poste")
                        .HasForeignKey("TelnetTeamBack.models.Poste", "UtilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Site");

                    b.Navigation("Utilisateur");
                });

            modelBuilder.Entity("TelnetTeamBack.models.ProjectSuccess", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Projet", "Projet")
                        .WithMany("ProjectSuccesses")
                        .HasForeignKey("ProjetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Projet");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Utilisateur", b =>
                {
                    b.HasOne("TelnetTeamBack.models.Département", "Département")
                        .WithMany("Utilisateurs")
                        .HasForeignKey("DepartementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Département");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Convention", b =>
                {
                    b.Navigation("Notification");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Département", b =>
                {
                    b.Navigation("Utilisateurs");
                });

            modelBuilder.Entity("TelnetTeamBack.models.EmployéMois", b =>
                {
                    b.Navigation("Notification");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Evenement", b =>
                {
                    b.Navigation("MediaEvents");

                    b.Navigation("Notification");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Nouveauté", b =>
                {
                    b.Navigation("Notification");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Projet", b =>
                {
                    b.Navigation("ProjectSuccesses");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Site", b =>
                {
                    b.Navigation("Départements");

                    b.Navigation("Nouveautés");

                    b.Navigation("Postes");
                });

            modelBuilder.Entity("TelnetTeamBack.models.Utilisateur", b =>
                {
                    b.Navigation("Connections");

                    b.Navigation("Demandes");

                    b.Navigation("EmployéMois");

                    b.Navigation("MariageNaissances");

                    b.Navigation("Messages");

                    b.Navigation("Poste");
                });
#pragma warning restore 612, 618
        }
    }
}
