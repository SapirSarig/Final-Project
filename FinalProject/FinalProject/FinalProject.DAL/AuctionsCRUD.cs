using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class AuctionsCRUD
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddAuction(Auction auction)
        {
            context.Auctions.Add(auction);
            context.SaveChanges();
        }

        public Auction GetAuction(int id)
        {
            return context.Auctions.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<Auction> GetAuctions()
        {
            return context.Auctions.ToList();
            
        }
    }
}
