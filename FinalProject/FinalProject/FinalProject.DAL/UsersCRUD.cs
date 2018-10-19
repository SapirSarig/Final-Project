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

        public bool AddStars(int id, int numOfStars)
        {
            bool res = false;
            User CurrUser = context.Users.FirstOrDefault(u => u.Id == id);
            if (CurrUser != null)
            {
                switch(numOfStars)
                {
                    case 1:
                        CurrUser.OneStar++;
                        break;
                    case 2:
                        CurrUser.TwoStars++;
                        break;
                    case 3:
                        CurrUser.ThreeStars++;
                        break;
                    case 4:
                        CurrUser.FourStars++;
                        break;
                    case 5:
                        CurrUser.FiveStars++;
                        break;

                }
                CurrUser.Stars += numOfStars;
                CurrUser.NumOfVoters++;
                double avg = (double)CurrUser.Stars / CurrUser.NumOfVoters;
                CurrUser.RateAvg = Convert.ToDouble(String.Format("{0:0.00}", avg));
                context.SaveChanges();
                res = true;
            }
            return res;
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
                if(userToUpdate.Interests!=null)
                {
                    ICollection<Interest> newInterests = new List<Interest>();
                    (CurrUser as InfluencerUser).Interests.Clear();

                    foreach (var newInterest in userToUpdate.Interests)
                    {
                        newInterests.Add(newInterest);
                    }

                    (CurrUser as InfluencerUser).Interests = newInterests;
                }
                

                CurrUser.Picture = userToUpdate.Picture;
                CurrUser.Description = userToUpdate.Description;
                if(userToUpdate.SocialNetworks != null)
                {
                    ICollection<SocialNetwork> newSocialNetworks = new List<SocialNetwork>();
                    (CurrUser as InfluencerUser).SocialNetworks.Clear();

                    foreach (var newSocialNetwork in userToUpdate.SocialNetworks)
                    {
                        newSocialNetworks.Add(newSocialNetwork);
                    }

                    (CurrUser as InfluencerUser).SocialNetworks = newSocialNetworks;

                }
                context.SaveChanges();
            }
        }

        public IEnumerable<UserChat> GetAllChats(int id)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == id);
            return user.UsersChats.ToList();
        }

        public void UpdateBusinessUser(UpdatedBusinessUserModal userToUpdate)
        {
            User CurrUser = context.Users.FirstOrDefault(u => u.Email == userToUpdate.Email);
            if (CurrUser != null)
            {
                CurrUser.Name = userToUpdate.Name;
                CurrUser.Interests = userToUpdate.Interests;
                CurrUser.Picture = userToUpdate.Picture;
                CurrUser.Description = userToUpdate.Description;
                (CurrUser as BusinessUser).WebsiteLink = userToUpdate.WebsiteLink;
                (CurrUser as BusinessUser).CompanyName = userToUpdate.CompanyName;
                context.SaveChanges();
            }
        }

        public User FindUserByOfferId(int offerId)
        {
            Offer offer = context.Offers.FirstOrDefault(o => o.Id == offerId);
            User user = offer.InfluencerUser;
            return user;
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
            Auction auction = context.Auctions.FirstOrDefault( a=>a.Id == auctionId);
            User user = auction.BusinessUser;
            return user;
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
