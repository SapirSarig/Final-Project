using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class InfluencerUser : User
    {
        [Required, MaxLength(20)]
        public string FirstName { get; set; }

        [Required, MaxLength(40)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public IList<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public IList<Interest> Interests { get; set; }
        
        public IList<Offer> Offers { get; set; }
    }
}
