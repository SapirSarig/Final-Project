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
    [RoutePrefix("api/Users")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private UsersBL usersBL = new UsersBL();

        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            return Ok("bla bla bla");
        }

        [HttpPost]
        public IHttpActionResult CreateAdvertiserUser([FromBody]AdvertiserUser user)
        {
             bool isCreated = usersBL.AddUser(user);
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