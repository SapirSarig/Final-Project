using FinalProject.BL;
using FinalProject.Entities;
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
    [RoutePrefix("api/Chats")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ChatsController : ApiController
    {
        private ChatBL chatBL = new ChatBL();

        [HttpPost]
        public IHttpActionResult CreateChat([FromBody]Chat chat)
        {
            ErrorMessage errorMessage = chatBL.CreateChat(chat);
            if (errorMessage.Code == HttpStatusCode.OK)
            {
                Chat createdChat = chatBL.GetChat(chat.Id);
                return Ok(createdChat);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

    }
}
