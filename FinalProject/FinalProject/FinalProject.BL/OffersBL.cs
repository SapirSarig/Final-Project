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
    public class OffersBL
    {
        private OffersCRUD offersCRUD = new OffersCRUD();

        public ErrorMessage CreateOffer(Offer offer)
        {
            try
            {
                offersCRUD.AddOffer(offer);
                ErrorMessage errorMessage = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return errorMessage;
            }
            catch (Exception e)
            {
                throw e;
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
                throw e;
            }
        }

        public IEnumerable<Offer> GetOffers()
        {
            return offersCRUD.GetOffers();
        }

        public ErrorMessage DeleteOffer(int id)
        {
            try
            {
                offersCRUD.DeleteOffer(id);
                ErrorMessage errorMessage = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return errorMessage;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Offer> GetOffersByUserId(int userId)
        {
            try
            {
                return offersCRUD.GetOffersByUserId(userId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
