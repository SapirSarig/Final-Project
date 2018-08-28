using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class AuctionsBL
    {
        private AuctionsCRUD auctionsCRUD;

        public AuctionsBL()
        {
            auctionsCRUD = new AuctionsCRUD();
        }

        public bool AddAuction(Auction auction)
        {
            auctionsCRUD.AddAuction(auction);
            return true;
        }
    }
}
