using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class AdvertiserUsersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddUser(AdvertiserUser user)
        {
            context.AdvertiserUsers.Add(user);            
            context.SaveChanges();
        }

        public void UpdateUser(AdvertiserUser user)
        {
            context.AdvertiserUsers.Attach(user);
            //maybe should replace the line above with a line that change state to Modified like - context.Entry(user).State = EntityState.Modified;             
            context.SaveChanges();
        }

        public void RemoveUser(int id)
        {
            context.AdvertiserUsers.Remove(GetUser(id));
            context.SaveChanges();
        }

        public AdvertiserUser GetUser(int id)
        {
            return context.AdvertiserUsers.Find(id);
        }


        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~AdvertiserUsersCRUD()
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