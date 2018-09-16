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
        private AuctionsCRUD auctionsCRUD = new AuctionsCRUD();

        public bool CreateAuction(Auction auction)
        {
            try
            {
                auctionsCRUD.AddAuction(auction);
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }

        }

        public Auction GetAuction(int id)
        {
            try
            {
                return auctionsCRUD.GetAuction(id);
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        public IEnumerable<Auction> GetAuctions()
        {
            return auctionsCRUD.GetAuctions();
        }

        public IEnumerable<Offer> GetAllOffers(int auctionId)
        {
            return auctionsCRUD.GetAllOffers(auctionId);
        }

        public bool DeleteAuction(int id)
        {
            try
            {
                auctionsCRUD.DeleteAuction(id);
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }
    }
}
