using FinalProject.BL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

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
            message.TimeSent = DateTime.Now;

<<<<<<< HEAD
            ErrorMessage errorMessage = messagesBL.AddMessage(message);
            if (errorMessage.Code == HttpStatusCode.OK)
=======
            bool isAdded = messagesBL.AddMessage(message);
            if (isAdded)
>>>>>>> f01b6aafa5d16019eb6da40d0016b8f859842f75
            {
                Message createdMessage = messagesBL.GetMessageById(message.Id);
                return Ok(createdMessage);
            }

            return new ResponseMessageResult(Request.CreateErrorResponse(
                    errorMessage.Code,
                   new HttpError(errorMessage.Message)
               )
           );
        }

        [HttpGet]
        public IHttpActionResult GetMessagesByOfferId(int chatId)
        {
            IEnumerable<Message> messages = messagesBL.GetMessagesByOfferId(chatId);
            return Ok(messages);
        }
    }
}
