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

        public ErrorMessage UpdateOffer(int offerId, string status)
        {
            offersCRUD.UpdateOffer(offerId, status);
            Offer offer = offersCRUD.GetOffer(offerId);
            if (offer == null)
            {
                ErrorMessage message = new ErrorMessage
                {
                    Message = "User does not exist",
                    Code = HttpStatusCode.NotModified
                };
                return message;
            }
            else
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
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

        public IEnumerable<Offer> GetAllOffersByBusinessUserId(int userId)
        {
            try
            {
                return offersCRUD.GetAllOffersByBusinessUserId(userId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ErrorMessage UpdateIsOpenNegotiation(int id)
        {
            offersCRUD.UpdateIsOpenNegotiation(id);
            Offer offer = offersCRUD.GetOffer(id);
            if (offer == null)
            {
                ErrorMessage message = new ErrorMessage
                {
                    Message = "Error Updating User",
                    Code = HttpStatusCode.NotModified
                };
                return message;
            }
            else
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
        }

        public ErrorMessage UpdatePrice(int offerId, string type, int value)
        {
            offersCRUD.UpdatePrice(offerId, type, value);
            Offer offer = offersCRUD.GetOffer(offerId);
            if (offer == null)
            {
                ErrorMessage message = new ErrorMessage
                {
                    Message = "Error Updating User",
                    Code = HttpStatusCode.NotModified
                };
                return message;
            }
            else
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
        }

    }
}
