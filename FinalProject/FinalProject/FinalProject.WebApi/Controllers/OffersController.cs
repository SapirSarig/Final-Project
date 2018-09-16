using FinalProject.BL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

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
            bool isCreated = offersBL.CreateOffer(offer);
            if (isCreated)
            {
                return Ok(offer);
            }
            return NotFound();
        }

        [HttpGet]
        public IHttpActionResult GetOffer(int id)
        {
            Offer offer = offersBL.GetOffer(id);
            return Ok(offer);
        }

        [HttpPatch]
        public IHttpActionResult UpdateOffer(Offer offer)
        {
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteOffer(int id)
        {
            bool isDeleted = offersBL.DeleteOffer(id);
            if (isDeleted)
            {
                return Ok();
            }
            return NotFound();
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
    }
}
