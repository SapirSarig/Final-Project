using FinalProject.DAL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class AuthenticationBL
    {
        private UsersCRUD usersCRUD;
        private PasswordWithSaltHasher pwHasher;

        public AuthenticationBL()
        {
            usersCRUD = new UsersCRUD();
            pwHasher = new PasswordWithSaltHasher();
        }

        public User Login(LoginModal loginModal)
        {
            if (string.IsNullOrEmpty(loginModal.Email) || string.IsNullOrEmpty(loginModal.Password))
            {
                return null;
            }
            else
            {
                try
                {
                    HashWithSaltResult hashResultSha256 = pwHasher.HashWithSalt(loginModal.Password, loginModal.Email);
                    loginModal.Password = hashResultSha256.Digest + hashResultSha256.Salt;
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
