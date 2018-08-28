using FinalProject.DAL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class AuthenticationBL
    {
        private UsersCRUD usersCRUD;

        public AuthenticationBL()
        {
            usersCRUD = new UsersCRUD();
        }

        public User Login(LoginModal loginModal)
        {
            if (string.IsNullOrEmpty(loginModal.email) || string.IsNullOrEmpty(loginModal.password))
            {
                return null;
            }
            else
            {
                try
                {
                    return usersCRUD.Login(loginModal);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }
            }
        }

        public User ExternalLogin(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }
            else
            {
                try
                {                  
                    return usersCRUD.ExternalLogin(email);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }
            }
        }
    }
}
