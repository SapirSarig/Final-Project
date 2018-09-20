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
    [RoutePrefix("api/InfluencerUsers")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InfluencerUsersController : ApiController
    {
        private InfluencerUsersBL influencerUsersBL = new InfluencerUsersBL();

        [HttpPost]
        public IHttpActionResult CreateUser(InfluencerUser user)
        {
            bool isCreated = influencerUsersBL.CreateInfluencerUser(user);
            if (isCreated)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPatch]
        public IHttpActionResult UpdateInfluencerUser(UpdatedInfluencerUserModal userToUpdate)
        {
            User updatedUser = influencerUsersBL.UpdateInfluencerUser(userToUpdate);
            if (updatedUser!=null)
            {
                return Ok(updatedUser);
            }
            return NotFound();
        }

        [Route("GetAllOffers")]
        public IEnumerable<Offer> GetAllOffers(int userId)
        {
            return influencerUsersBL.GetAllOffers(userId);
        }
    }
}
