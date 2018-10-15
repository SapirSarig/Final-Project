using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class MessagesBL
    {
        private MessagesCRUD messagesCRUD = new MessagesCRUD();

        public ErrorMessage AddMessage(Message message)
        {
            try
            {
                messagesCRUD.AddMessage(message);
                ErrorMessage errorMessage = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return errorMessage;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<Message> GetMessagesByOfferId(int chatId)
        {
            return messagesCRUD.GetMessage(chatId);
        }

        public Message GetMessageById(int id)
        {
            return messagesCRUD.GetMessageById(id);
        }
    }
}
