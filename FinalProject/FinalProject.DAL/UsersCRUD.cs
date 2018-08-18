using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// This File wiil not be use, it will replace by InfluencerUserCRUD and AdvertiserUserCRUD

namespace FinalProject.DAL
{
    public class UsersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddUser(User user)
        {
            //context.Users.Add(user);
            context.SaveChanges();
        }


        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~UsersCRUD()
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
