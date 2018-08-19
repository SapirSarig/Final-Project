using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    [Table("InfluencerUsers")]
    public class InfluencerUser : User
    {
        InfluencerUser()
        {
            SocialNetworks = new HashSet<SocialNetwork>();
            Interests = new HashSet<Interest>();
            Offers = new HashSet<InfluencerUserOffers>();
        }

        [Required, MaxLength(20)]
        public string FirstName { get; set; }

        [Required, MaxLength(40)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public ICollection<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public ICollection<Interest> Interests { get; set; }
        
        public ICollection<InfluencerUserOffers> Offers { get; set; }
    }
}
