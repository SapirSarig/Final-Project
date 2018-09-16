using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class ChatBL
    {
        private ChatsCRUD chatsCRUD = new ChatsCRUD();
        public bool CreateChat(Chat chat)
        {
            try
            {
                chatsCRUD.CreateChat(chat);
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }

        
    }
}
