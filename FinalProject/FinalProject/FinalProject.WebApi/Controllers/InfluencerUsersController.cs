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
    [RoutePrefix("api/InfluencerUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InfluencerUsersController : ApiController
    {
        private InfluencerUsersBL influencerUsersBL = new InfluencerUsersBL();
        private UsersBL usersBL = new UsersBL();

        [HttpPost]
        public IHttpActionResult CreateUser(InfluencerUser user)
        {
            ErrorMessage errorMessage = influencerUsersBL.CreateInfluencerUser(user);
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
        public IHttpActionResult UpdateInfluencerUser(UpdatedInfluencerUserModal userToUpdate)
        {
            ErrorMessage errorMessage = influencerUsersBL.UpdateInfluencerUser(userToUpdate);
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

        [Route("GetAllOffers")]
        public IEnumerable<Offer> GetAllOffers(int userId)
        {
            return influencerUsersBL.GetAllOffers(userId);
        }
    }
}
