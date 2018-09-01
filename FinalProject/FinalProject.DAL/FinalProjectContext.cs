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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<InfluencerUser>().HasMany(iu => iu.Offers).WithRequired().HasForeignKey<int>(o=>o.UserId);
            //modelBuilder.Entity<AdvertiserUser>().HasMany(au => au.Auctions).WithRequired();
            //modelBuilder.Entity<InfluencerUser>().HasMany(iu => iu.SocialNetworks).WithRequired();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Offer> Offers { get; set; }
        //public DbSet<Auction> Auctions { get; set; }
        
    }
}
