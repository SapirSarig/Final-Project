using FinalProject.BL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;
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

        ////???
        //[HttpPatch]
        //public IHttpActionResult UpdateUser(User user)
        //{
        //    User UpdatedUser = usersBL.UpdateUser(user);
        //    return Ok(user);
        //}

        //[HttpPost]
        //public IHttpActionResult UpdateUser([FromBody]User user)
        //{
        //    User UpdatedUser = usersBL.UpdateUser(user);
        //    return Ok(user);
        //}

        //how to delete from db??
        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
            bool isDeleted = usersBL.DeleteUser(id);
            if (isDeleted)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return usersBL.GetUsers();
        }

        [Route("GetUserByEmail")]
        public IHttpActionResult GetUserByEmail(string email)
        {
            User user = usersBL.GetUserByEmail(email);
            return Ok(user);
        }

        [Route("GetFilteredUsersByName")]
        public IHttpActionResult GetFilteredUsersByName(string SearchStr)
        {
            IEnumerable<User> users = usersBL.GetFilteredUsersByName(SearchStr);
            return Ok(users);
        }

        [Route("AddReview")]
        public IHttpActionResult AddReview(int userId, Review review)
        {
            bool isAdded = usersBL.AddReview(userId, review);
            if (isAdded)
            {
                return Ok(userId);
            }
            return NotFound();
        }

        [Route("SendPassword")]
        public IHttpActionResult SendPassword(VerifyPasswordModal verifyPasswordObject)
        {
            bool isSent = usersBL.SendPassword(verifyPasswordObject);
            if (isSent)
            {
                return Ok(verifyPasswordObject);
            }
            return NotFound();
        }


    }
}
