using System.Web.Http;
using System.Web.Http.Cors;
using FinalProject.BL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;

namespace FinalProject.Controllers
{
    [RoutePrefix("api/Authentication")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        private AuthenticationBL authenticationBL = new AuthenticationBL();

        [HttpPost]
        public IHttpActionResult Login([FromBody]LoginModal loginModal)
        {
            User user = authenticationBL.Login(loginModal);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IHttpActionResult ExternalLogin(string email)
        {
            User user = authenticationBL.ExternalLogin(email);
            if (user != null)
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
