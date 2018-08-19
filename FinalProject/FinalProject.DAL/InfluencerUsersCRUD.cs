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

        public void AddUser(InfluencerUser user)
        {
            context.InfluencerUsers.Add(user);
            context.SaveChanges();
        }

        public void UpdateUser(InfluencerUser user)
        {
            context.InfluencerUsers.Attach(user);
            //maybe should replace the line above with a line that change state to Modified like - context.Entry(user).State = EntityState.Modified;             
            context.SaveChanges();
        }

        public void RemoveUser(int id)
        {

            context.InfluencerUsers.Remove(GetUser(id));
            context.SaveChanges();
        }

        public InfluencerUser GetUser(int id)
        {
            return context.InfluencerUsers.FirstOrDefault(inf => inf.Id == id);
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