
using FinalProject.BL;
using FinalProject.Entities;
//using FinalProject.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;


namespace FinalProject.Controllers
{
    [RoutePrefix("api/InfluencerUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InfluencerUsersController : ApiController
    {
        private InfluencerUsersBL influencerUsersBL = new InfluencerUsersBL();

        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            InfluencerUser user = influencerUsersBL.GetUser(id);
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
        public IHttpActionResult CreateAdvertiserUser([FromBody]InfluencerUser user)
        {
            bool isCreated = influencerUsersBL.AddUser(user);
            if (isCreated)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}