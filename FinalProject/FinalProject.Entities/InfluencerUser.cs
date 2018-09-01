using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class InfluencerUser : User
    {
        public InfluencerUser()
        {
            //SocialNetworks = new HashSet<SocialNetwork>();
            //Interests = new HashSet<Interest>();
            //Offers = new HashSet<Offer>();
        }

        //public virtual ICollection<Offer> Offers { get; set; }


        //[Required, MaxLength(40)]
        //public string LastName { get; set; }

        //[Required]
        //public DateTime DateOfBirth { get; set; }

        //[Required]
        //public ICollection<SocialNetwork> SocialNetworks { get; set; }



        //[Required]
        //public ICollection<Interest> Interests { get; set; }

    }
}
