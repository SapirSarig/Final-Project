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
    public class BusinessUsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();
        private PasswordWithSaltHasher pwHasher = new PasswordWithSaltHasher();

        public bool CreateBusinessUser(BusinessUser user)
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
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {
                    return false;
                    throw;
                }
            }
            else
            {
                return false;
            }

        }

        public IEnumerable<Auction> GetAllAuctions(int userId)
        {
            return userCRUD.GetAllAuctions(userId);
        }

        public User UpdateBusinessUser(UpdatedBusinessUserModal userToUpdate)
        {
            return userCRUD.UpdateBusinessUser(userToUpdate);
        }
    }
}
