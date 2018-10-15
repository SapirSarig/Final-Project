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
    [RoutePrefix("api/Auctions")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuctionsController : ApiController
    {
        private AuctionsBL auctionsBL = new AuctionsBL();


        [HttpPost]
        public IHttpActionResult CreateAuction(Auction auction)
        {
            ErrorMessage errorMessage = auctionsBL.CreateAuction(auction);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                Auction createdAuction = auctionsBL.GetAuction(auction.Id);
                return Ok(createdAuction);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpGet]
        public IHttpActionResult GetAuction(int id)
        {
            Auction auction = auctionsBL.GetAuction(id);
            return Ok(auction);
        }


        //TO DO!
        [HttpPatch]
        public IHttpActionResult UpdateAuction(Auction auction)
        {
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteAuction(int id)
        {
            ErrorMessage errorMessage = auctionsBL.DeleteAuction(id);
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
        public IEnumerable<Auction> GetAllAuctions()
        {
            return auctionsBL.GetAuctions();
        }

        [Route("FilteredAuctions")]
        public IEnumerable<Auction> GetFilteredAuctions(string SearchStr)
        {
            return auctionsBL.GetFilteredAuctions(SearchStr);
        }

        [Route("GetAuctionsByEmail")]
        public IEnumerable<Auction> GetAuctionsByEmail(string Email)
        {
            return auctionsBL.GetAuctionsByEmail(Email);
        }

        [Route("GetAllOffers")]
        public IEnumerable<Offer> GetAllOffers(int AuctionId)
        {
            return auctionsBL.GetAllOffers(AuctionId);
        }

    }
}

