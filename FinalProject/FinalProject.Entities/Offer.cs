using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Offer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Auction Auction { get; set; }

        [Required]
        public InfluencerUser InfluencerUser { get; set; }

        public string UserRequirements { get; set; }

        public int Price { get; set; }

        [Required]
        public Type Type { get; set; }

        [Required]
        public string OfferDescription { get; set; }

        [Required]
        public IList<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public OfferStatus Status { get; set; }

    }
}
