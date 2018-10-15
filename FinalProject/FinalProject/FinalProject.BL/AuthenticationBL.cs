using FinalProject.DAL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public ErrorMessage Login(LoginModal loginModal)
        {
            if (string.IsNullOrEmpty(loginModal.Email) || string.IsNullOrEmpty(loginModal.Password))
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.NotModified,
                    Message = "Validation Error"
                };
                return message;
            }
            else
            {
                try
                {
                    HashWithSaltResult hashResultSha256 = pwHasher.HashWithSalt(loginModal.Password, loginModal.Email);
                    loginModal.Password = hashResultSha256.Digest + hashResultSha256.Salt;
                    User user =  usersCRUD.Login(loginModal);
                    if (user != null)
                    {
                        ErrorMessage message = new ErrorMessage
                        {
                            Code = HttpStatusCode.OK,
                        };
                        return message;
                    }
                    else
                    {
                        ErrorMessage message = new ErrorMessage
                        {
                            Code = HttpStatusCode.NotModified,
                            Message = "Validation Error"
                        };
                        return message;
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        public ErrorMessage ExternalLogin(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.NotModified,
                    Message = "Validation Error"
                };
                return message;
            }
            else
            {
                try
                {
                    User user = usersCRUD.ExternalLogin(email);
                    if (user != null)
                    {
                        ErrorMessage message = new ErrorMessage
                        {
                            Code = HttpStatusCode.OK,
                        };
                        return message;
                    }
                    else
                    {
                        ErrorMessage message = new ErrorMessage
                        {
                            Code = HttpStatusCode.NotModified,
                            Message = "Validation Error"
                        };
                        return message;
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
    }
}
