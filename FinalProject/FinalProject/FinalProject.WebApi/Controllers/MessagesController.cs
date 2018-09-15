﻿using FinalProject.BL;
using FinalProject.Entities;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FinalProject.WebApi.Controllers
{
    [RoutePrefix("api/Messages")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MessagesController : ApiController
    {
        private MessagesBL messagesBL = new MessagesBL();

        [HttpPost]
        public IHttpActionResult AddMessage([FromBody]Message message)
        {
            bool isAdded = messagesBL.AddMessage(message);
            if (isAdded)
            {
                return Ok(message);
            }
            return NotFound();
        }

        [HttpGet]
        public IHttpActionResult GetMessagesByOfferId(int chatId)
        {
            IEnumerable<Message> messages = messagesBL.GetMessagesByOfferId(chatId);
            return Ok(messages);
        }
    }
}