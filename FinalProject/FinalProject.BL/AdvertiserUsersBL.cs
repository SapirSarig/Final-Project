using FinalProject.DAL;
using FinalProject.Entities;
using System;

namespace FinalProject.BL
{
    public class AdvertiserUsersBL
    {
        private UsersCRUD usersCRUD;

        public AdvertiserUsersBL()
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

        //    public bool UpdateUser(AdvertiserUser user)
        //    {
        //        if (user == null)
        //        {
        //            return false;
        //        }
        //        else
        //        {
        //            try
        //            {
        //                advertiserUsersCRUD.UpdateUser(user);
        //                return true;
        //            }
        //            catch (Exception e)
        //            {
        //                Console.WriteLine(e);
        //                return false;
        //            }
        //        }
        //    }

        //    public bool RemoveUser(int id)
        //    {
        //        if (id < 0)
        //        {
        //            return false;
        //        }
        //        else
        //        {
        //            try
        //            {
        //                advertiserUsersCRUD.RemoveUser(id);
        //                return true;
        //            }
        //            catch (Exception e)
        //            {
        //                Console.WriteLine(e);
        //                return false;
        //            }
        //        }
        //    }

        public User GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }
            else
            {
                try
                {
                    return usersCRUD.GetUserByEmail(email);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }
            }
        }

        public User GetUserById(int id)
        {
            if (id < 0)
            {
                return null;
            }
            else
            {
                try
                {
                    return usersCRUD.GetUserById(id);
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
