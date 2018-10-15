using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class MessagesCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddMessage(Message message)
        {
            context.Messages.Add(message);
            context.SaveChanges();
        }

        public IEnumerable<Message> GetMessage(int chatId)
        {
            IEnumerable<Message> allMessages = context.Messages.ToList();
            List<Message> offersMessages = new List<Message>();
            
            foreach(Message msg in allMessages)
            {
                if(msg.ChatId == chatId)
                {
                    offersMessages.Add(msg);
                }
            }
            return (IEnumerable<Message>)offersMessages;
        }

        public Message GetMessageById(int id)
        {
            return context.Messages.FirstOrDefault((message) => message.Id == id);
        }
        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~MessagesCRUD()
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
