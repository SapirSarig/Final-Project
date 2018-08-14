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
        private InfluencerUsersCRUD influencerUsersCRUD;

        public InfluencerUsersBL()
        {
            influencerUsersCRUD = new InfluencerUsersCRUD();
        }

        public bool AddUser(InfluencerUser user)
        {
            if (user == null)
            {
                return false;
            }
            else
            {
                try
                {
                    influencerUsersCRUD.AddUser(user);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }

        public bool UpdateUser(InfluencerUser user)
        {
            if (user == null)
            {
                return false;
            }
            else
            {
                try
                {
                    influencerUsersCRUD.UpdateUser(user);
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
                    influencerUsersCRUD.RemoveUser(id);
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
        }

        public InfluencerUser GetUser(int id)
        {
            if (id < 0)
            {
                return null;
            }
            else
            {
                try
                {
                    return influencerUsersCRUD.GetUser(id);
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

