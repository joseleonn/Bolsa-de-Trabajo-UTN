﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BolsaDeTrabajo.Model.Models
{
    public partial class BolsaDeTrabajoUTNContext : DbContext
    {
        public BolsaDeTrabajoUTNContext()
        {
        }

        public BolsaDeTrabajoUTNContext(DbContextOptions<BolsaDeTrabajoUTNContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admins> Admins { get; set; }
        public virtual DbSet<Alumnos> Alumnos { get; set; }
        public virtual DbSet<Empresas> Empresas { get; set; }
        public virtual DbSet<EmpresasPuestos> EmpresasPuestos { get; set; }
        public virtual DbSet<EstadosPostulacion> EstadosPostulacion { get; set; }
        public virtual DbSet<Postulaciones> Postulaciones { get; set; }
        public virtual DbSet<PuestosDeTrabajo> PuestosDeTrabajo { get; set; }
        public virtual DbSet<PuestosDeTrabajoPostulaciones> PuestosDeTrabajoPostulaciones { get; set; }
        public virtual DbSet<Suscriptores> Suscriptores { get; set; }
        public virtual DbSet<TiposAdmin> TiposAdmin { get; set; }
        public virtual DbSet<TiposUsuarios> TiposUsuarios { get; set; }
        public virtual DbSet<Tokens> Tokens { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admins>(entity =>
            {
                entity.HasKey(e => e.IdAdmin);

                entity.Property(e => e.IdAdmin).HasColumnName("Id_Admin");

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.RolAdmin).HasColumnName("Rol_Admin");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admins_Usuarios");

                entity.HasOne(d => d.RolAdminNavigation)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.RolAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Admins_Tipos_Admin");
            });

            modelBuilder.Entity<Alumnos>(entity =>
            {
                entity.HasKey(e => e.Dni);

                entity.Property(e => e.Dni)
                    .HasMaxLength(8)
                    .HasColumnName("DNI");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Celular)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Ciudad)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Curriculum).HasMaxLength(50);

                entity.Property(e => e.Direccion)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Nacionalidad)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Alumnos_Usuarios");
            });

            modelBuilder.Entity<Empresas>(entity =>
            {
                entity.HasKey(e => e.IdEmpresa);

                entity.Property(e => e.IdEmpresa).HasColumnName("Id_Empresa");

                entity.Property(e => e.Ciudad)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Direccion)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<EmpresasPuestos>(entity =>
            {
                entity.HasKey(e => e.IdEmpresaPuestos);

                entity.ToTable("Empresas_Puestos");

                entity.Property(e => e.IdEmpresaPuestos)
                    .ValueGeneratedNever()
                    .HasColumnName("Id_Empresa_Puestos");

                entity.Property(e => e.IdEmpresa).HasColumnName("Id_Empresa");

                entity.Property(e => e.IdPuestosDeTrabajo).HasColumnName("Id_PuestosDeTrabajo");

                entity.HasOne(d => d.IdEmpresaNavigation)
                    .WithMany(p => p.EmpresasPuestos)
                    .HasForeignKey(d => d.IdEmpresa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Empresas_Puestos_Empresas");
            });

            modelBuilder.Entity<EstadosPostulacion>(entity =>
            {
                entity.HasKey(e => e.IdEstado);

                entity.ToTable("Estados_Postulacion");

                entity.Property(e => e.IdEstado).HasColumnName("Id_Estado");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Postulaciones>(entity =>
            {
                entity.HasKey(e => e.IdPostulacion);

                entity.Property(e => e.IdPostulacion).HasColumnName("Id_Postulacion");

                entity.Property(e => e.DniAlumno)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("DNI_Alumno");

                entity.HasOne(d => d.DniAlumnoNavigation)
                    .WithMany(p => p.Postulaciones)
                    .HasForeignKey(d => d.DniAlumno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Postulaciones_Alumnos");

                entity.HasOne(d => d.EstadoNavigation)
                    .WithMany(p => p.Postulaciones)
                    .HasForeignKey(d => d.Estado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Postulaciones_Estados_Postulacion");
            });

            modelBuilder.Entity<PuestosDeTrabajo>(entity =>
            {
                entity.HasKey(e => e.IdPuesto);

                entity.Property(e => e.IdPuesto).HasColumnName("Id_Puesto");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.IdEmpresa).HasColumnName("Id_Empresa");

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PuestosDeTrabajoPostulaciones>(entity =>
            {
                entity.HasKey(e => e.IdPuestosDeTrabajoPostulaciones);

                entity.ToTable("PuestosDeTrabajo_Postulaciones");

                entity.Property(e => e.IdPuestosDeTrabajoPostulaciones).HasColumnName("Id_PuestosDeTrabajo_Postulaciones");

                entity.Property(e => e.IdPostulacion).HasColumnName("Id_Postulacion");

                entity.Property(e => e.IdPuestoDeTrabajo).HasColumnName("Id_PuestoDeTrabajo");

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.HasOne(d => d.IdPostulacionNavigation)
                    .WithMany(p => p.PuestosDeTrabajoPostulaciones)
                    .HasForeignKey(d => d.IdPostulacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PuestosDeTrabajo_Postulaciones_Postulaciones");

                entity.HasOne(d => d.IdPuestoDeTrabajoNavigation)
                    .WithMany(p => p.PuestosDeTrabajoPostulaciones)
                    .HasForeignKey(d => d.IdPuestoDeTrabajo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PuestosDeTrabajo_Postulaciones_PuestosDeTrabajo");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.PuestosDeTrabajoPostulaciones)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PuestosDeTrabajo_Postulaciones_Usuarios");
            });

            modelBuilder.Entity<Suscriptores>(entity =>
            {
                entity.HasKey(e => e.IdSuscriptor);

                entity.Property(e => e.IdSuscriptor)
                    .ValueGeneratedNever()
                    .HasColumnName("id_suscriptor");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Suscriptores)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Suscriptores_Usuarios");
            });

            modelBuilder.Entity<TiposAdmin>(entity =>
            {
                entity.HasKey(e => e.IdTipoAdmin);

                entity.ToTable("Tipos_Admin");

                entity.Property(e => e.IdTipoAdmin).HasColumnName("Id_Tipo_Admin");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<TiposUsuarios>(entity =>
            {
                entity.HasKey(e => e.IdTipo);

                entity.ToTable("Tipos_Usuarios");

                entity.Property(e => e.IdTipo).HasColumnName("Id_Tipo");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Tokens>(entity =>
            {
                entity.HasKey(e => e.Token);

                entity.Property(e => e.Token).HasMaxLength(255);

                entity.Property(e => e.FechaExpiracion)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("Fecha_Expiracion");

                entity.Property(e => e.FechaGeneracion)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("Fecha_Generacion");

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Tokens)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tokens_Usuarios");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Contrasenia)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.TipoUsuario).HasColumnName("Tipo_Usuario");

                entity.HasOne(d => d.TipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.TipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuarios_Tipos_Usuarios");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}