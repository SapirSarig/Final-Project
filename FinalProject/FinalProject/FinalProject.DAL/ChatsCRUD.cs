using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class ChatsCRUD
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void CreateChat(Chat chat)
        {
            context.Chats.Add(chat);
            context.SaveChanges();
        }

        public Chat GetChat(int id)
        {
            return context.Chats.FirstOrDefault((chat)=>chat.Id == id);
        }
    }
}
