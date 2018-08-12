using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class FinalProjectContext : DbContext
    {
        public FinalProjectContext()
            : base("name=FinalProjectConnection") { }

        static FinalProjectContext()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<FinalProjectContext>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Offer> Offers { get; set; }
    }
}
