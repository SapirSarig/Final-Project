using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class OffersBL
    {
        private OffersCRUD offersCRUD = new OffersCRUD();

        public bool CreateOffer(Offer offer)
        {
            try
            {
                offersCRUD.AddOffer(offer);
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }

        }

        public Offer GetOffer(int id)
        {
            try
            {
               return offersCRUD.GetOffer(id);
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        public IEnumerable<Offer> GetOffers()
        {
            return offersCRUD.GetOffers();
        }

        public bool DeleteOffer(int id)
        {
            try
            {
                offersCRUD.DeleteOffer(id);
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
