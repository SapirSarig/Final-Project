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
    public class OffersController : ApiController
    {
        private OffersBL offerBL = new OffersBL();
        [HttpPost]
        public IHttpActionResult CreateOffer([FromBody]Offer offer)
        {
            bool isCreated = offerBL.AddOffer(offer);
            if (isCreated)
            {
                return Ok(offer);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
