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
    [RoutePrefix("api/BusinessUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BusinessUsersController : ApiController
    {
        private BusinessUsersBL businessUsersBL = new BusinessUsersBL();

        [HttpPost]
        public IHttpActionResult CreateUser(BusinessUser user)
        {
            bool isCreated = businessUsersBL.CreateBusinessUser(user);
            if (isCreated)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPatch]
        public IHttpActionResult UpdateUser(BusinessUser user)
        {
            return Ok();
        }
    }
}
