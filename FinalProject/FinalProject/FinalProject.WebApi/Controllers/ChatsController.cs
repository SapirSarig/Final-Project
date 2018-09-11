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
    [RoutePrefix("api/Chats")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ChatsController : ApiController
    {
        private ChatBL chatBL = new ChatBL();

        [HttpPost]
        public IHttpActionResult CreateChat([FromBody]Chat chat)
        {
            bool isCreated = chatBL.CreateChat(chat);
            if (isCreated)
            {
                return Ok(chat);
            }
            return NotFound();
        }

    }
}
