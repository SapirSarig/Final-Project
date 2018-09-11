using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class InfluencerUsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();

        public bool CreateInfluencerUser(InfluencerUser user)
        {
            //Unvalid - if(ValidationUtil.ValidateInfluenceUser(user))
            if (true)
            {
                try
                {
                    userCRUD.AddUser(user);
                    return true;
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
    }
}
