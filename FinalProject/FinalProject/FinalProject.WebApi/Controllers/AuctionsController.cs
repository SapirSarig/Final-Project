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
    [RoutePrefix("api/Auctions")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuctionsController : ApiController
    {
        private AuctionsBL auctionsBL = new AuctionsBL();

        [HttpPost]
        public IHttpActionResult CreateAuction(Auction auction)
        {
            bool isCreated = auctionsBL.CreateAuction(auction);
            if (isCreated)
            {
                return Ok(auction);
            }
            return NotFound();
        }

        [HttpGet]
        public IHttpActionResult GetAuction(int id)
        {
            Auction auction = auctionsBL.GetAuction(id);
            return Ok(auction);
        }

        [HttpPatch]
        public IHttpActionResult UpdateAuction(Auction auction)
        {
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteAuction(int id)
        {
            return Ok();
        }


        [HttpGet]
        public IEnumerable<Auction> GetAllAuctions()
        {
            return auctionsBL.GetAuctions();
        }
    }
}

