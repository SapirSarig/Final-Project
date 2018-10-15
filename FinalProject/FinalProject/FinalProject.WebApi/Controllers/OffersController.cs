using FinalProject.BL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace FinalProject.WebApi.Controllers
{
    [RoutePrefix("api/Offers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OffersController : ApiController
    {
        private OffersBL offersBL = new OffersBL();
        private AuctionsBL auctionBl = new AuctionsBL();

        [HttpPost]
        public IHttpActionResult CreateOffer(Offer offer)
        {
            ErrorMessage errorMessage = offersBL.CreateOffer(offer);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                Offer createdOffer = offersBL.GetOffer(offer.Id);
                return Ok(createdOffer);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpGet]
        public IHttpActionResult GetOffer(int id)
        {
            Offer offer = offersBL.GetOffer(id);
            return Ok(offer);
        }

        [HttpPatch]
        public IHttpActionResult UpdateOffer(int offerId, string status)
        {
            ErrorMessage errorMessage = offersBL.UpdateOffer(offerId, status);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                Offer updatedOffer = offersBL.GetOffer(offerId);
                return Ok(updatedOffer);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpDelete]
        public IHttpActionResult DeleteOffer(int id)
        {
            ErrorMessage errorMessage = offersBL.DeleteOffer(id);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                return Ok();
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpGet]
        public IEnumerable<Offer> GetAllOffers()
        {
            return offersBL.GetOffers();
        }

        [Route("GetOffersByAuctionId")]
        public IEnumerable<Offer> GetOffersByAuctionId(int auctionId)
        {
            return auctionBl.GetOffersByAuctionId(auctionId);
        }

        [Route("GetOffersByUserId")]
        public IEnumerable<Offer> GetOffersByUserId(int userId)
        {
            return offersBL.GetOffersByUserId(userId);
        }

        [Route("GetAllOffersByBusinessUserId")]
        public IEnumerable<Offer> GetAllOffersByBusinessUserId(int userId)
        {
            return offersBL.GetAllOffersByBusinessUserId(userId);
        }

    }
}
