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
    }
    

}
