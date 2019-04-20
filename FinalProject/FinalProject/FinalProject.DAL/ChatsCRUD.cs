using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class ChatsCRUD : IDisposable
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

        public Chat GetChatByOfferId(int id)
        {
           return context.Chats.FirstOrDefault((c) => c.OfferId == id);
        }

        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~ChatsCRUD()
        {
            _dispose(false);
        }

        private void _dispose(bool disposing)
        {
            // close context
            context.Dispose();
            if (disposing)
            {
                GC.SuppressFinalize(this);
            }
        }

        #endregion
    }
}
