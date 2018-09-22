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
    public class InfluencerUsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();
         private PasswordWithSaltHasher pwHasher = new PasswordWithSaltHasher();

        public bool CreateInfluencerUser(InfluencerUser user)
        {
            //Unvalid - if(ValidationUtil.ValidateInfluenceUser(user))
            if (true)
            {
                try
                {
                    if(!userCRUD.IsEmailExist((user.Email)))
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

        public IEnumerable<Offer> GetAllOffers(int userId)
        {
            return userCRUD.GetAllOffers(userId);
        }

        public User UpdateInfluencerUser(UpdatedInfluencerUserModal userToUpdate)
        {
            return userCRUD.UpdateInfluencerUser(userToUpdate);
        }
    }
}
