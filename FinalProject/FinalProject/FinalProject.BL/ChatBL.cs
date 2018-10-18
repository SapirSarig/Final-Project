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
    public class ChatBL
    {
        private ChatsCRUD chatsCRUD = new ChatsCRUD();
        public ErrorMessage CreateChat(Chat chat)
        {
            try
            {
                chatsCRUD.CreateChat(chat);
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Chat GetChat(int id)
        {
            return chatsCRUD.GetChat(id);
        }

        public Chat GetChatByOfferId(int offerId)
        {
            return chatsCRUD.GetChatByOfferId(offerId);
        }
    }
}
