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
    public class BusinessUsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();
        private PasswordWithSaltHasher pwHasher = new PasswordWithSaltHasher();

        public ErrorMessage CreateBusinessUser(BusinessUser user)
        {
            //Unvalid: if (ValidationUtil.ValidateBusinessUser(user))
            if (true)
            {
                try
                {
                    if (!userCRUD.IsEmailExist((user.Email)))
                    {
                        HashWithSaltResult hashResultSha256 = pwHasher.HashWithSalt(user.Password, user.Email);
                        user.Password = hashResultSha256.Digest + hashResultSha256.Salt;
                        userCRUD.AddUser(user);
                        ErrorMessage message = new ErrorMessage
                        {
                            Code = HttpStatusCode.OK
                        };
                        return message;
                    }
                    else
                    {
                        ErrorMessage message = new ErrorMessage
                        {
                            Message = "Mail already exists!",
                            Code = HttpStatusCode.Unauthorized
                        };
                        return message;
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            else
            {
                ErrorMessage message = new ErrorMessage
                {
                    Message = "Validation Error",
                    Code = HttpStatusCode.InternalServerError
                };
                return message;
            }

        }

        public IEnumerable<Auction> GetAllAuctions(int userId)
        {
            return userCRUD.GetAllAuctions(userId);
        }

        public ErrorMessage UpdateBusinessUser(UpdatedBusinessUserModal userToUpdate)
        {
            User user = userCRUD.UpdateBusinessUser(userToUpdate);
            if (user == null)
            {
                ErrorMessage message = new ErrorMessage
                {
                    Message = "User does not exist",
                    Code = HttpStatusCode.NotModified
                };
                return message;
            }
            else
            {
                ErrorMessage message = new ErrorMessage
                {
                    Code = HttpStatusCode.OK
                };
                return message;
            }
        }
    }
}
