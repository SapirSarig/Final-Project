using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinalProject.Entities.Enums;

namespace FinalProject.Entities
{
    public class InfluencerUser :User
    {
        public InfluencerUser()
        {
            Offers = new HashSet<Offer>();
        }

        public DateTime DateOfBirth { get; set; }

        public virtual ICollection<Offer> Offers { get; set; }


        //do we need a new hashset here??

       //public ICollection<SocialNetwork> SocialNetworks { get; set; }
    }
}
