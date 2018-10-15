using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class OffersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddOffer(Offer offer)
        {
            context.Offers.Add(offer);
            context.SaveChanges();
        }

        public Offer GetOffer(int id)
        {
            return context.Offers.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Offer> GetOffers()
        {
            return context.Offers.ToList();
        }

        public void DeleteOffer(int id)
        {
            Offer offer = context.Offers.FirstOrDefault(o => o.Id == id);
            context.Offers.Remove(offer);
            context.SaveChanges();
        }

        public IEnumerable<Offer> GetOffersByUserId(int userId)
        {
            IQueryable<Offer> filteredOffers =  from offer in context.Offers
                                                where offer.UserId.Equals(userId)
                                                select offer;


            return filteredOffers.ToList();
        }
        
        public IEnumerable<Offer> GetAllOffersByBusinessUserId(int userId)
        {
            IQueryable<Offer> filteredOffers = from offer in context.Offers
                                               where offer.Auction.UserId == userId
                                               select offer;


            return filteredOffers.ToList();
        }

        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~OffersCRUD()
        {
            _dispose(false);
        }

        private void _dispose(bool disposing)
        {
            // close context
            context.Dispose();
            if (disposing)
            {
                GC.SuppressFinalize(this);
            }
        }

        public void UpdateOffer(int offerId, string status)
        {
            Offer currOffer = context.Offers.FirstOrDefault(o => o.Id == offerId);
            if (currOffer != null)
            {
                currOffer.Status = status;
                context.SaveChanges();
            }
        }



        #endregion
    }
}
