using FinalProject.DAL;
using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;

namespace FinalProject.BL
{
    public class UsersBL
    {
        private UsersCRUD userCRUD = new UsersCRUD();
        private PasswordWithSaltHasher pwHasher = new PasswordWithSaltHasher();

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
            User user;
            if(checkUserAnswers(verifyPasswordObject, out user))
            {
                //send email
                try
                {
                    string to = verifyPasswordObject.Email;
                    string from = "itsadealteam@gmail.com";
                    string subject = "Your Password";

                    string tokenEmailPassword = JwtManager.GenerateToken(user.Email, user.Password);
                    string body = String.Format(@"
                                    Hello {0}! 
                                    Your password is {1}
                                    Please erase that email after you entered your account succefully.
                                    http://localhost:3000/resetPassword?authUser={2}
                                    Thanks!
                                    Its a deal team", user.Name, user.Password, tokenEmailPassword);
                    

                    MailMessage mail = new MailMessage(from, to, subject, body);
                    SmtpClient client = new SmtpClient("smtp.gmail.com");
                    client.Credentials = new NetworkCredential("itsadealteam@gmail.com", "12345@Aa");
                    client.Port = 25;
                    client.EnableSsl = true;
                    client.Send(mail);
                    return true;
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public bool ResetPassword(string userAuth, string newPassword)
        {
            IEnumerable<Claim> claims = JwtManager.JwtTokenGetClaims(userAuth);
            string email = claims.FirstOrDefault(claim => claim.Type == "Email").Value;
            string Password = claims.FirstOrDefault(claim => claim.Type == "Password").Value;
            User user = GetUserByEmail(email);

            if (user.Password == Password)
            {
                HashWithSaltResult hashResultSha256 = pwHasher.HashWithSalt(newPassword, user.Email);
                string newHashPassword = hashResultSha256.Digest + hashResultSha256.Salt;

                userCRUD.ResetPassword(user, newHashPassword);
                return true;
            }
            return false;
        }

            private bool checkUserAnswers(VerifyPasswordModal verifyPasswordObject, out User user)
        {
            user = userCRUD.GetUserByEmail(verifyPasswordObject.Email);
            if(user.Question1 == verifyPasswordObject.Question1 && user.Question2 == verifyPasswordObject.Question2)
            {
                return true;
            }
            return false;
        }
    }
}
