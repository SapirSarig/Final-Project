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
    [RoutePrefix("api/BusinessUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BusinessUsersController : ApiController
    {
        private BusinessUsersBL businessUsersBL = new BusinessUsersBL();
        private UsersBL usersBL = new UsersBL();

        [HttpPost]
        public IHttpActionResult CreateUser(BusinessUser user)
        {
            ErrorMessage errorMessage = businessUsersBL.CreateBusinessUser(user);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                User createdUser = usersBL.GetUserByEmail(user.Email);
                return Ok(createdUser);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpPatch]
        public IHttpActionResult UpdateBusinessUser(UpdatedBusinessUserModal userToUpdate)
        {
            ErrorMessage errorMessage = businessUsersBL.UpdateBusinessUser(userToUpdate);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                User updatedUser = usersBL.GetUserByEmail(userToUpdate.Email);
                return Ok(updatedUser);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [Route("GetAllAuctions")]
        public IEnumerable<Auction> GetAllAuctions(int userId)
        {
            return businessUsersBL.GetAllAuctions(userId);
        }
    }
}

