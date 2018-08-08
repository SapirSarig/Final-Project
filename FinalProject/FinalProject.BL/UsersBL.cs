using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class UsersBL
    {
        private UsersCRUD usersCRUD;

        public UsersBL()
        {
            usersCRUD = new UsersCRUD();
        }


        public bool AddUser(User user)
        {
            if (user == null)
            {
                return false;
            }
            else
            {
                try
                {
                    usersCRUD.AddUser(user);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }
    }
}
