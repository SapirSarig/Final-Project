using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class MessagesBL
    {
        private MessagesCRUD messagesCRUD = new MessagesCRUD();

        public bool AddMessage(Message message)
        {
            try
            {
                messagesCRUD.AddMessage(message);
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
