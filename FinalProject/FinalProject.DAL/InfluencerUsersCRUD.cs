using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class InfluencerUsersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public void UpdateUser(InfluencerUser user)
        {
            context.Users.Attach(user);
            //maybe should replace the line above with a line that change state to Modified like - context.Entry(user).State = EntityState.Modified;             
            context.SaveChanges();
        }

        public void RemoveUser(int id)
        {

            context.Users.Remove(GetUser(id));
            context.SaveChanges();
        }

        public User GetUser(int id)
        {
            return context.Users.FirstOrDefault(user => user.UserId == id);
        }

        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~InfluencerUsersCRUD()
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