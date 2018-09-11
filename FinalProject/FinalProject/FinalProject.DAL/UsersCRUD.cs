using FinalProject.Entities;
using FinalProject.Entities.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class UsersCRUD
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
            return context.Users.FirstOrDefault(user => user.Email == loginModal.email && user.Password == loginModal.password);
        }

        public User ExternalLogin(string email)
        {
            return context.Users.FirstOrDefault(user => user.Email == email);
        }

        public User GetUserByEmail(string email)
        {
            return context.Users.FirstOrDefault(u => u.Email == email);
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

        public User UpdateUser(User user)
        {
            User CurrUser = context.Users.FirstOrDefault(u => u.Id == user.Id);
            if (CurrUser == null)
            {
                return null;
            }
            else
            {
                //??
                context.Users.Remove(CurrUser);
                context.Users.Add(user);
                context.SaveChanges();
                return user;
            }

            // foreach (var airplaneIndex in context.Airplanes.ToList())
            //{
            //    if (airplaneIndex.Id == airplane.Id)
            //    {
            //        context.Airplanes.Remove(airplaneIndex);
            //        context.Airplanes.Add(airplane);
            //        context.SaveChanges();
            //        break;
            //    }
            //}
        }

        public void DeleteUser(int id)
        {
            User user = context.Users.FirstOrDefault(u => u.Id == id);
            context.Users.Remove(user);
            context.SaveChanges();
        }
    }
}
