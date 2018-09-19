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

        public IEnumerable<User> GetFilteredUsersByName(string searchStr)
        {
            try
            {
                if (searchStr == null || searchStr == "")
                    return GetUsers();
                else
                    return userCRUD.GetFilteredUsersByName(searchStr);
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

        public bool SendPassword(VerifyPasswordModal verifyPasswordObject)
        {
            if(checkUserAnswers(verifyPasswordObject))
            {
                //send email
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool checkUserAnswers(VerifyPasswordModal verifyPasswordObject)
        {
            User user = userCRUD.GetUserByEmail(verifyPasswordObject.Email);
            if(user.Question1 == verifyPasswordObject.Question1 && user.Question2 == verifyPasswordObject.Question2)
            {
                return true;
            }
            return false;
        }
    }
}
