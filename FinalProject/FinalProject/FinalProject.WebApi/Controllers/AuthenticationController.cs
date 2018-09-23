using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
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
        private UsersBL userBL = new UsersBL();

        [HttpPost]
        public IHttpActionResult Login([FromBody]LoginModal loginModal)
        {
            ErrorMessage errorMessage = authenticationBL.Login(loginModal);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                User user = userBL.GetUserByEmail(loginModal.Email);
                return Ok(user);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpGet]
        public IHttpActionResult ExternalLogin(string email)
        {
            ErrorMessage errorMessage = authenticationBL.ExternalLogin(email);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                User user = userBL.GetUserByEmail(email);
                return Ok(user);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

    }
}
