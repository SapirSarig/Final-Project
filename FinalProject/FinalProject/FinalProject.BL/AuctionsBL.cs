using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class AuctionsBL
    {
        private AuctionsCRUD auctionsCRUD = new AuctionsCRUD();

        public ErrorMessage CreateAuction(Auction auction)
        {
            try
            {
                auctionsCRUD.AddAuction(auction);
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
            catch (Exception e)
            {
                throw e;
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

        public IEnumerable<Auction> GetFilteredAuctions(string searchStr)
        {
            if (searchStr == null || searchStr == "")
                return GetAuctions();            
            else
                return auctionsCRUD.GetFilteredAuctions(searchStr);
        }
        
        public IEnumerable<Auction> GetAuctionsByEmail(string Email)
        {
            if (Email == null || Email == "")
                return GetAuctions();
            else
                return auctionsCRUD.GetAuctionsByEmail(Email);
        }

        public IEnumerable<Offer> GetAllOffers(int auctionId)
        {
            return auctionsCRUD.GetAllOffers(auctionId);
        }

        public ErrorMessage DeleteAuction(int id)
        {
            try
            {
                auctionsCRUD.DeleteAuction(id);
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ErrorMessage CloseAuction(int id)
        {
            try
            {
                auctionsCRUD.CloseAuction(id);
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Offer> GetOffersByAuctionId(int auctionId)
        {
            return auctionsCRUD.GetOffersByAuctionId(auctionId);
        }
    }
}
