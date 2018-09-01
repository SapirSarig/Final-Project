using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using FinalProject.Entities.Enums;

namespace FinalProject.Entities
{
    //Base class for InfluencerUser and AdvertiserUser
    public class User
    {
        public User()
        {
            //Interests = new HashSet<string>();
            Offers = new HashSet<Offer>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        //[RegularExpression(@.......)]
        public string Email { get; set; }

        [Required, MinLength(6)]
        //[RegularExpression(@.......)]
        public string Password { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Offer> Offers { get; set; }
        //public virtual ICollection<Interest> Interests { get; set; }

        //public UserTypes type { get; set; } 

    }
}
