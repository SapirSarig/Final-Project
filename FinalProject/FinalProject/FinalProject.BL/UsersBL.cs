using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class UsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();

        public User GetUser(int id)
        {
            try
            {
                return userCRUD.GetUser(id);
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        public IEnumerable<User> GetUsers()
        {
            return userCRUD.GetUsers();
        }

        public User GetUserByEmail(string email)
        {
            try
            {
                return userCRUD.GetUserByEmail(email);
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        public bool AddReview(int userId, Review review)
        {
            try
            {
                return userCRUD.AddReview(userId, review);
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }

        public User UpdateUser(User user)
        {
            try
            {
                return userCRUD.UpdateUser(user);
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        public bool DeleteUser(int id)
        {
            try
            {
                userCRUD.DeleteUser(id);
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }
    }
}
