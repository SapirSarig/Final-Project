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
        private UsersCRUD usersCRUD;

        public InfluencerUsersBL()
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

        //public bool UpdateUser(InfluencerUser user)
        //{
        //    if (user == null)
        //    {
        //        return false;
        //    }
        //    else
        //    {
        //        try
        //        {
        //            influencerUsersCRUD.UpdateUser(user);
        //            return true;
        //        }
        //        catch (Exception e)
        //        {
        //            Console.WriteLine(e);
        //            return false;
        //        }
        //    }
        //}

        //public bool RemoveUser(int id)
        //{
        //    if (id < 0)
        //    {
        //        return false;
        //    }
        //    else
        //    {
        //        try
        //        {
        //            influencerUsersCRUD.RemoveUser(id);
        //            return true;
        //        }
        //        catch (Exception e)
        //        {
        //            Console.WriteLine(e);
        //            return false;
        //        }
        //    }
        //}

        public User GetUser(int id)
        {
            if (id < 0)
            {
                return null;
            }
            else
            {
                try
                {
                    return usersCRUD.GetUser(id);
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

