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
using System.Web.Http.Results;

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
            ErrorMessage errorMessage = usersBL.DeleteUser(id);
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
            ErrorMessage errorMessage = usersBL.AddReview(userId, review);
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

        [HttpPost]
        [Route("SendLinkToResetPassword")]
        public IHttpActionResult SendLinkToResetPassword(VerifyPasswordModal verifyPasswordObject)
        {
            bool isSent = usersBL.SendLinkToResetPassword(verifyPasswordObject);
            if (isSent)
            {
                return Ok(verifyPasswordObject);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("ResetPassword")]
        public IHttpActionResult ResetPassword([FromBody]ResetPasswordModal ResetPasswordModal)
        {
            bool isSent = usersBL.ResetPassword(ResetPasswordModal.AuthUser, ResetPasswordModal.Password);
            if (isSent)
            {
                return Ok("sdasda");
            }
            return NotFound();
        }


    }
}
