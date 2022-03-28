using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastucture
{
    public class ToDoListAppDBContext : IdentityDbContext
    {
        public ToDoListAppDBContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<IdentityUser>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Folder>()
               .Property(x => x.Id)
               .IsRequired()
               .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Folder>()
              .Property(x => x.Title)
              .IsRequired()
              .HasMaxLength(25);

            modelBuilder.Entity<Folder>()
              .Property(x => x.Date)
              .IsRequired()
              .HasColumnType("DATETIME")
              .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<ToDo>()
                        .Property(p => p.Id)
                        .IsRequired()         
                        .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<ToDo>()
                        .Property(p => p.Name)
                        .IsRequired()
                        .HasMaxLength(30);

            modelBuilder.Entity<ToDo>()
                        .Property(p => p.Description)
                        .IsRequired().HasMaxLength(10000);

            modelBuilder.Entity<ToDo>()
                        .Property(p => p.Date)
                        .IsRequired()
                        .HasColumnType("DATE");
            modelBuilder.Entity<ToDo>()
                        .Property(p => p.Priority)
                        .IsRequired();

            modelBuilder.Entity<ToDo>()
                        .HasOne<Folder>(s => s.Folder)
                        .WithMany(g => g.Todo)
                        .HasForeignKey(s => s.FolderId);

            modelBuilder.Entity<Tag>()
                         .Property(p => p.Id)
                         .IsRequired()
                         .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<ToDoTag>()
                        .HasOne(nt => nt.ToDo)
                        .WithMany(n => n.ToDoTags)
                        .HasForeignKey(nt => nt.ToDoId);

            modelBuilder.Entity<ToDoTag>()
                        .HasOne(nt => nt.Tag)
                        .WithMany(t => t.ToDoTags)
                        .HasForeignKey(nt => nt.TagId);
            
            modelBuilder.Entity<ToDoTag>()
                     .Property(p => p.Id)
                     .IsRequired()
                     .HasDefaultValueSql("NEWID()");

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Tag> Tags { get; set; }

        public DbSet<Folder> Folders { get; set; }
        public DbSet<ToDo> ToDoList { get; set; }
        public DbSet<ToDoTag> ToDoListTags { get; set; }
    }
}
