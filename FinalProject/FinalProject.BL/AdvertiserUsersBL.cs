using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class AdvertiserUsersBL
    {
        private AdvertiserUsersCRUD advertiserUsersCRUD;

        public AdvertiserUsersBL()
        {
            advertiserUsersCRUD = new AdvertiserUsersCRUD();
        }    

        public bool AddUser(AdvertiserUser user)
        {
            if (user == null)
            {
                return false;
            }
            else
            {
                try
                {
                    advertiserUsersCRUD.AddUser(user);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }

        public bool UpdateUser(AdvertiserUser user)
        {
            if (user == null)
            {
                return false;
            }
            else
            {
                try
                {
                    advertiserUsersCRUD.UpdateUser(user);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }

        public bool RemoveUser(int id)
        {
            if (id < 0)
            {
                return false;
            }
            else
            {
                try
                {
                    advertiserUsersCRUD.RemoveUser(id);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }

        public AdvertiserUser GetUser(int id)
        {
            if (id < 0)
            {
                return null;
            }
            else
            {
                try
                {
                    return advertiserUsersCRUD.GetUser(id);                    
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
