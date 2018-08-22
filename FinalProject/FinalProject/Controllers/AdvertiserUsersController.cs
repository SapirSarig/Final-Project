using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.BL;
using FinalProject.Entities;
using System.Web.Http.Cors;

namespace FinalProject.Controllers
{
    [RoutePrefix("api/AdvertiserUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AdvertiserUsersController : ApiController
    {
        private AdvertiserUsersBL advertiserUsersBL = new AdvertiserUsersBL();

        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            User user = advertiserUsersBL.GetUser(id);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IHttpActionResult CreateAdvertiserUser([FromBody]AdvertiserUser user)
        {
            bool isCreated = advertiserUsersBL.AddUser(user);
            if (isCreated)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
