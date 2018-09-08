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
    [RoutePrefix("api/Users")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private UsersBL usersBL = new UsersBL();

        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            User user = usersBL.GetUser(id);
            return Ok(user);
        }

        [HttpPatch]
        public IHttpActionResult UpdateUser(User user)
        {
            return Ok();
        }

        //how to delete from db??
        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
            return Ok();
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return usersBL.GetUsers();
        }

        //[HttpGet]
        //public IHttpActionResult GetUserByEmail(string email)
        //{
        //    User user = usersBL.GetUserByEmail(email);
        //    return Ok(user);
        //}
    }
}
