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

        public IEnumerable<Auction> GetFilteredAuctions(string searchStr)
        {
            // Query for all Auctions that their Title contains searchStr
            IQueryable<Auction> filteredAuctions =  from auction in context.Auctions
                                                    where auction.Title.Contains(searchStr)
                                                    select auction;


            return filteredAuctions.ToList();
        }

        public IEnumerable<Offer> GetAllOffers(int auctionId)
        {
            Auction auction = context.Auctions.FirstOrDefault(a => a.Id == auctionId);
            if (auction == null)
            {
                return null;
            }
            else
            {
                return auction.Offers;               
            }
        }

        public void DeleteAuction(int id)
        {
            Auction auction = context.Auctions.FirstOrDefault(a => a.Id == id);
            context.Auctions.Remove(auction);
            context.SaveChanges();
        }

        public IEnumerable<Offer> GetOffersByAuctionId(int auctionId)
        {
            IEnumerable<Auction> allAuctios = context.Auctions.ToList();
            List<Offer> auctionsOffers = new List<Offer>();

            foreach (Auction auction in allAuctios)
            {
                if (auction.Id == auctionId)
                {
                    auctionsOffers = auction.Offers.ToList();
                    break;
                }
            }
            return (IEnumerable<Offer>)auctionsOffers;
        }
    }

}
