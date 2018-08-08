using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class FinalProjectContext : DbContext
    {
        public FinalProjectContext()
            : base("name=FinalProjectConnection") { }

        public DbSet<User> Users { get; set; }
        public DbSet<Auction> Auctions { get; set; }
    }
}
