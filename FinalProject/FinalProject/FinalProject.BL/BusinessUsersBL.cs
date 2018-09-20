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
    public class BusinessUsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();

        public bool CreateBusinessUser(BusinessUser user)
        {
            //Unvalid: if (ValidationUtil.ValidateBusinessUser(user))
            if (true)
            {
                try
                {
                    if (!userCRUD.IsEmailExist((user.Email)))
                    {
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
