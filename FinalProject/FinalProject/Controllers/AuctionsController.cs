using FinalProject.BL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FinalProject.Controllers
{

    [RoutePrefix("api/Auctions")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuctionsController : ApiController
    {
        private AuctionsBL auctionsBL = new AuctionsBL();
        [HttpPost]
        public IHttpActionResult CreateAuction([FromBody]Auction auction)
        {
            bool isCreated = auctionsBL.AddAuction(auction);
            if (isCreated)
            {
                return Ok(auction);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
