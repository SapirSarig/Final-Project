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
            SocialNetworks = new HashSet<SocialNetwork>();
        }

        public DateTime DateOfBirth { get; set; }

        public virtual ICollection<Offer> Offers { get; set; }

        public virtual ICollection<SocialNetwork> SocialNetworks { get; set; }

    }
}
