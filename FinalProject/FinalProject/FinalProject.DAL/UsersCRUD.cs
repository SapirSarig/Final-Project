using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class UsersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User GetUser(int id)
        {
            return context.Users.FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.ToList();
        }

        public User Login(LoginModal loginModal)
        {
            return context.Users.FirstOrDefault(user => user.Email == loginModal.Email && user.Password == loginModal.Password);
        }

        public User ExternalLogin(string email)
        {
            return context.Users.FirstOrDefault(user => user.Email == email);
        }

        public User GetUserByEmail(string email)
        {
            User user = context.Users.FirstOrDefault(u => u.Email == email);
            return user;
        }

        public IEnumerable<User> GetFilteredUsersByName(string searchStr)
        {
            // Query for all Users that their name contains searchStr
            IQueryable<User> filteredUsers = from user in context.Users
                                             where user.Name.Contains(searchStr)
                                             select user;


            return filteredUsers.ToList();
        }
        
        public IEnumerable<User> GetFilteredInfluencersByName(string searchStr)
        {
            if (searchStr == null || searchStr == "")
            {
                IQueryable<User> filteredInfluencers = from user in context.Users
                                                       where user.Type == "Social Influencer"
                                                       select user;
                return filteredInfluencers.ToList();
            }
            else
            {
                // Query for all Users that their name contains searchStr
                IQueryable<User> filteredInfluencers = from user in context.Users
                                                       where (user.Name.Contains(searchStr) && user.Type == "Social Influencer")
                                                       select user;
                return filteredInfluencers.ToList();
            }



        }

        public bool AddReview(int userId, Review review)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return false;
            }
            else
            {
                user.Reviews.Add(review);
                context.SaveChanges();
                return true;
            }
        }

        public IEnumerable<Offer> GetAllOffers(int userId)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return null;
            }
            else
            {
                return (user as InfluencerUser).Offers;
            }
        }

        public IEnumerable<Auction> GetAllAuctions(int userId)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return null;
            }
            else
            {
                return (user as BusinessUser).Auctions;
            }
        }

        public void UpdateInfluencerUser(UpdatedInfluencerUserModal userToUpdate)
        {
            User CurrUser = context.Users.FirstOrDefault(u => u.Email == userToUpdate.Email);
            if (CurrUser != null)
            {            
                CurrUser.Name = userToUpdate.Name;
                CurrUser.Interests = userToUpdate.Interests;
                CurrUser.Picture = userToUpdate.Picture;
                CurrUser.Description = userToUpdate.Description;
                (CurrUser as InfluencerUser).SocialNetworks = userToUpdate.SocialNetworks;
                context.SaveChanges();
            }
        }

        public User UpdateBusinessUser(UpdatedBusinessUserModal userToUpdate)
        {
            User CurrUser = context.Users.FirstOrDefault(u => u.Email == userToUpdate.Email);
            if (CurrUser == null)
            {
                return null;
            }
            else
            {
                CurrUser.Name = userToUpdate.Name;
                CurrUser.Interests = userToUpdate.Interests;
                CurrUser.Picture = userToUpdate.Picture;
                CurrUser.Description = userToUpdate.Description;
                (CurrUser as BusinessUser).WebsiteLink = userToUpdate.WebsiteLink;
                (CurrUser as BusinessUser).CompanyName = userToUpdate.CompanyName;
                context.SaveChanges();
                return CurrUser;
            }
        }

        public void DeleteUser(int id)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == id);
            context.Users.Remove(user);
            context.SaveChanges();
        }

        public void ResetPassword(User currUser, string newHashPassword)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == currUser.Id);
            user.Password = newHashPassword;
            context.SaveChanges();
        }

        public User FindUserByAuctionId(int auctionId)
        {
            throw new NotImplementedException();
        }

        public bool IsEmailExist(string email)
        {
            User res = context.Users.FirstOrDefault(user => user.Email == email);
            if (res != null)
                return true;
            return false;
        }
        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~UsersCRUD()
        {
            _dispose(false);
        }

        private void _dispose(bool disposing)
        {
            // close context
            context.Dispose();
            if (disposing)
            {
                GC.SuppressFinalize(this);
            }
        }

        #endregion
    }
}
